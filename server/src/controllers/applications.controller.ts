import { Request, Response } from "express";
import Application from "../models/Application";
import Job from "../models/Job";
import User from "../models/User";

import { v2 as cloudinary } from "cloudinary";

// Declare global socketService type
declare global {
  var socketService: any;
}

export const applyJob = async (req: any, res: Response) => {
  const { jobId, coverLetter } = req.body;
  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });
  
  let resumeUrl: string | undefined;
  if (req.file?.path) {
    resumeUrl = req.file.path; // multer-storage-cloudinary sets this
  }
  
  try {
    const app = await Application.create({
      jobId,
      applicantId: req.user.id,
      coverLetter,
      resumeUrl,
    });
    res.status(201).json(app);
  } catch (e: any) {
    if (e.code === 11000)
      return res
        .status(400)
        .json({ message: "You already applied to this job" });
    throw e;
  }
};

export const userApplications = async (req: any, res: Response) => {
  const apps = await Application.find({ applicantId: req.params.userId })
    .populate({
      path: "jobId",
      populate: { path: "createdBy", select: "name company" }
    })
    .sort({ createdAt: -1 });
  res.json(apps);
};

export const adminStats = async (_req: any, res: Response) => {
  const totalApplications = await Application.countDocuments();
  const totalUsers = await User.countDocuments();
  
  const byJob = await Application.aggregate([
    { $group: { _id: "$jobId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  
  res.json({ totalApplications, totalUsers, byJob });
};

// For employer: see applicants for their jobs
export const applicantsForJob = async (req: any, res: Response) => {
  const jobId = req.params.jobId;
  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  
  if (String(job.createdBy) !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }
  
  const apps = await Application.find({ jobId })
    .populate('applicantId', 'name email phone location')
    .sort({ createdAt: -1 });
  res.json(apps);
};

// Get detailed application information
export const getApplicationDetails = async (req: any, res: Response) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('applicantId', 'name email phone location')
      .populate('jobId', 'title company location jobType minSalary maxSalary');
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Check if user has permission to view this application
    const job = await Job.findById(application.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    if (String(job.createdBy) !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    
    res.json(application);
  } catch (error) {
    console.error('Error fetching application details:', error);
    res.status(500).json({ message: 'Failed to fetch application details' });
  }
};

// Get employer's jobs with applicant counts
export const getEmployerJobsWithApplicants = async (req: any, res: Response) => {
  try {
    const employerId = req.user.id;
    
    // Get all jobs created by the employer
    const jobs = await Job.find({ createdBy: employerId })
      .sort({ createdAt: -1 });
    
    // Get applicant counts for each job
    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicantCount = await Application.countDocuments({ jobId: job._id });
        const statusCounts = await Application.aggregate([
          { $match: { jobId: job._id } },
          { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);
        
        const statusMap = {
          applied: 0,
          shortlisted: 0,
          rejected: 0,
          hired: 0
        };
        
        statusCounts.forEach(({ _id, count }) => {
          statusMap[_id as keyof typeof statusMap] = count;
        });
        
        return {
          ...job.toObject(),
          applicantCount,
          statusCounts: statusMap
        };
      })
    );
    
    res.json(jobsWithApplicants);
  } catch (error) {
    console.error('Error fetching employer jobs with applicants:', error);
    res.status(500).json({ message: 'Failed to fetch jobs with applicants' });
  }
};

// Admin dashboard stats
export const adminDashboard = async (_req: any, res: Response) => {
  const jobsCount = await Job.countDocuments();
  const applicantsCount = await User.countDocuments({ role: 'applicant' });
  const employersCount = await User.countDocuments({ role: 'employer' });
  const applicationsCount = await Application.countDocuments();
  res.json({ jobsCount, applicantsCount, employersCount, applicationsCount });
};

export const updateApplicationStatus = async (req: any, res: Response) => {
  try {
    const { status } = req.body; // "shortlisted", "rejected", "hired", or "applied"
    const app = await Application.findById(req.params.id).populate("jobId");
    
    if (!app) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Only job creator or admin can update status
    if (
      String((app.jobId as any).createdBy) !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    // Validate status
    const validStatuses = ['applied', 'shortlisted', 'rejected', 'hired'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    
    app.status = status;
    await app.save();
    
    // Populate applicant details for response
    await app.populate('applicantId', 'name email');
    
    // Send real-time notification to applicant
    if (global.socketService) {
      try {
        const jobTitle = (app.jobId as any).title;
        const applicantId = String(app.applicantId);
        const jobId = String(app.jobId);
        
        switch (status) {
          case 'shortlisted':
            await global.socketService.notifyShortlisted(applicantId, jobId, jobTitle);
            break;
          case 'rejected':
            await global.socketService.notifyRejected(applicantId, jobId, jobTitle);
            break;
          case 'hired':
            await global.socketService.notifyHired(applicantId, jobId, jobTitle);
            break;
          default:
            await global.socketService.notifyApplicationStatusChange(applicantId, jobId, status, jobTitle);
        }
      } catch (notificationError) {
        console.error('Error sending notification:', notificationError);
        // Don't fail the status update if notification fails
      }
    }
    
    res.json({
      message: `Application ${status} successfully`,
      application: app
    });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ message: 'Failed to update application status' });
  }
};

// Delete application (only by employer or admin)
export const deleteApplication = async (req: any, res: Response) => {
  try {
    const application = await Application.findById(req.params.id).populate("jobId");
    
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Only job creator or admin can delete
    if (
      String((application.jobId as any).createdBy) !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    // Delete the resume from Cloudinary if it exists
    if (application.resumeUrl && application.resumeUrl.includes('cloudinary.com')) {
      try {
        const publicId = application.resumeUrl.split('/').pop()?.split('.')[0];
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
        }
      } catch (cloudinaryError) {
        console.error('Error deleting from Cloudinary:', cloudinaryError);
        // Continue with application deletion even if Cloudinary deletion fails
      }
    }
    
    await Application.findByIdAndDelete(req.params.id);
    
    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ message: 'Failed to delete application' });
  }
};