import { Request, Response } from "express";
import Application from "../models/Application";
import Job from "../models/Job";
import { v2 as cloudinary } from "cloudinary";
export const applyJob = async (req: any, res: Response) => {
  const { jobId } = req.body;
  const job = await Job.findById(jobId);
  if (!job) return res.status(404).json({ message: "Job not found" });
  let resumeUrl: string | undefined;
  if (req.file?.path) {
    resumeUrl = req.file.path; // multer-storage-cloudinary sets this
  }
  try {
    const app = await Application.create({
      jobId,
      userId: req.user.id,
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
  const apps = await Application.find({ userId: req.params.userId }).populate(
    "jobId"
  );
  res.json(apps);
};
export const adminStats = async (_req: any, res: Response) => {
  const byJob = await Application.aggregate([
    { $group: { _id: "$jobId", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
  ]);
  res.json({ byJob });
};
