import { Router } from "express";
import { auth } from "../middleware/auth";
import { permit } from "../middleware/auth";
import SavedJob from "../models/SavedJob";

const router = Router();

// Save a job
router.post("/", auth, permit("applicant"), async (req, res) => {
  try {
    const { jobId, applicantId } = req.body;
    
    // Check if already saved
    const existing = await SavedJob.findOne({ jobId, applicantId });
    if (existing) {
      return res.status(400).json({ message: "Job already saved" });
    }
    
    const savedJob = await SavedJob.create({ jobId, applicantId });
    res.status(201).json(savedJob);
  } catch (error) {
    res.status(500).json({ message: "Failed to save job" });
  }
});

// Unsave a job
router.delete("/:jobId/:applicantId", auth, permit("applicant"), async (req, res) => {
  try {
    const { jobId, applicantId } = req.params;
    
    const result = await SavedJob.findOneAndDelete({ jobId, applicantId });
    if (!result) {
      return res.status(404).json({ message: "Saved job not found" });
    }
    
    res.json({ message: "Job unsaved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to unsave job" });
  }
});

// Get saved jobs for an applicant
router.get("/:applicantId", auth, permit("applicant"), async (req, res) => {
  try {
    const { applicantId } = req.params;
    
    const savedJobs = await SavedJob.find({ applicantId })
      .populate({
        path: "jobId",
        populate: { path: "createdBy", select: "name company" }
      })
      .sort({ savedAt: -1 });
    
    res.json(savedJobs);
  } catch (error) {
    res.status(500).json({ message: "Failed to get saved jobs" });
  }
});

export default router;
