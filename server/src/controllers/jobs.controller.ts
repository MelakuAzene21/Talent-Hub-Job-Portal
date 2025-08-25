import { Request, Response } from "express";
import Job from "../models/Job";
import Application from "../models/Application";

export const listJobs = async (req: Request, res: Response) => {
  const { q, skills } = req.query as any;
  const query: any = {};
  if (q)
    query.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ];
  if (skills) query.skills = { $in: String(skills).split(",") };
  const jobs = await Job.find(query)
    .sort({ createdAt: -1 })
    .populate("createdBy", "name");
  res.json(jobs);
};

export const createJob = async (req: any, res: Response) => {
  try {
    const { 
      title, 
      company, 
      location, 
      jobType, 
      minSalary, 
      maxSalary, 
      description, 
      requirements, 
      skills 
    } = req.body;

    // Validate required fields
    if (!title || !company || !location || !jobType || !minSalary || !maxSalary || !description) {
      return res.status(400).json({ 
        message: "Missing required fields",
        required: ["title", "company", "location", "jobType", "minSalary", "maxSalary", "description"]
      });
    }

    const job = await Job.create({
      title,
      company,
      location,
      jobType,
      minSalary: Number(minSalary),
      maxSalary: Number(maxSalary),
      description,
      requirements: Array.isArray(requirements) ? requirements : [],
      skills: Array.isArray(skills) ? skills : [],
      createdBy: req.user.id,
    });

    res.status(201).json(job);
  } catch (error) {
    console.error('Job creation error:', error);
    res.status(500).json({ 
      message: "Failed to create job",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const removeJob = async (req: any, res: Response) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: "Not found" });
  if (String(job.createdBy) !== req.user.id && req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  await job.deleteOne();
  res.json({ message: "Deleted" });
};

export const employerJobs = async (req: any, res: Response) => {
  const jobs = await Job.find({ createdBy: req.user.id }).lean();
  const jobIds = jobs.map((j) => j._id);
  const counts = await Application.aggregate([
    { $match: { jobId: { $in: jobIds } } },
    { $group: { _id: "$jobId", count: { $sum: 1 } } },
  ]);
  const map: any = {};
  counts.forEach((c) => (map[c._id] = c.count));
  const result = jobs.map((j) => ({
    ...j,
    applicants: map[j._id.toString()] || 0,
  }));
  res.json(result);
};

// Edit job
export const updateJob = async (req: any, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Not found" });
    if (String(job.createdBy) !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    
    const { 
      title, 
      company, 
      location, 
      jobType, 
      minSalary, 
      maxSalary, 
      description, 
      requirements, 
      skills 
    } = req.body;

    // Update job with all fields
    Object.assign(job, {
      title,
      company,
      location,
      jobType,
      minSalary: Number(minSalary),
      maxSalary: Number(maxSalary),
      description,
      requirements: Array.isArray(requirements) ? requirements : [],
      skills: Array.isArray(skills) ? skills : [],
    });

    await job.save();
    res.json(job);
  } catch (error) {
    console.error('Job update error:', error);
    res.status(500).json({ 
      message: "Failed to update job",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};