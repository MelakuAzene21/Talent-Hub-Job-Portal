import { Router } from "express";
import { auth, permit } from "../middleware/auth";
import {
  applyJob,
  userApplications,
  adminStats,
  applicantsForJob,
  adminDashboard,
  updateApplicationStatus,
  
} from "../controllers/applications.controller";
import multer from "multer";
import { cloudinary } from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Application from "../models/Application"; // Added missing import

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "talenthub/resumes", resource_type: "raw" },
});
const upload = multer({ storage });

const router = Router();

// Legacy route with file upload (keep for backward compatibility)
router.post(
  "/",
  auth,
  permit("applicant", "admin"),
  upload.single("resume"),
  applyJob
);

// New route for creating applications (without file upload)
router.post(
  "/create",
  auth,
  permit("applicant"),
  async (req, res) => {
    try {
      const { jobId, applicantId, coverLetter, resumeUrl } = req.body;
      
      // Validate required fields
      if (!jobId || !applicantId || !coverLetter || !resumeUrl) {
        return res.status(400).json({ 
          message: "Missing required fields: jobId, applicantId, coverLetter, resumeUrl" 
        });
      }
      
      // Check if already applied
      const existing = await Application.findOne({ jobId, applicantId });
      if (existing) {
        return res.status(400).json({ message: "You already applied to this job" });
      }
      
      // Create application
      const app = await Application.create({
        jobId,
        applicantId,
        coverLetter,
        resumeUrl,
      });
      
      res.status(201).json(app);
    } catch (error) {
      console.error('Application creation error:', error);
      res.status(500).json({ message: "Failed to create application" });
    }
  }
);

router.get("/:userId", auth, userApplications);
router.get("/admin/stats/all", auth, permit("admin"), adminStats);
router.get("/job/:jobId", auth, permit("employer", "admin"), applicantsForJob);
router.get("/admin/dashboard", auth, permit("admin"), adminDashboard);
router.put(
  "/:id/status",
  auth,
  permit("employer", "admin"),
  updateApplicationStatus
);

export default router;
