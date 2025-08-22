import { Request, Response } from "express";
import Application from "../models/Application";
import Job from "../models/Job";
import User from "../models/User";

import { v2 as cloudinary } from "cloudinary";

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
    .populate('applicantId', 'name email')
    .sort({ createdAt: -1 });
  res.json(apps);
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
  const { status } = req.body; // "shortlisted", "rejected", or "hired"
  const app = await Application.findById(req.params.id).populate("jobId");
  if (!app) return res.status(404).json({ message: "Application not found" });

  // Only job creator or admin can update status
  if (
    String(app.jobId.createdBy) !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return res.status(403).json({ message: "Forbidden" });
  }
  
  app.status = status;
  await app.save();
  res.json(app);
};