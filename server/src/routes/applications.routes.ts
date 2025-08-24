import { Router, Request } from "express";
import { auth, permit } from "../middleware/auth";
import {
  applyJob,
  userApplications,
  adminStats,
  applicantsForJob,
  adminDashboard,
  updateApplicationStatus,
  getApplicationDetails,
  getEmployerJobsWithApplicants,
  deleteApplication,
} from "../controllers/applications.controller";
import multer from "multer";
import { cloudinary, hasCloudinaryConfig } from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import Application from "../models/Application";

// Extend Request interface to include user
interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    [key: string]: any;
  };
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: (req, file) => ({
    folder: "talenthub/resumes",
    resource_type: "auto",
    public_id: `${Date.now()}_${file.originalname}`,
  }),
});

const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, and DOCX files are allowed.'));
    }
  }
});

const router = Router();

// Route for creating applications with file upload
router.post(
  "/create",
  auth,
  permit("applicant"),
  upload.single("resume"),
  async (req: AuthenticatedRequest, res) => {
    try {
      // Check Cloudinary configuration first
      if (!hasCloudinaryConfig) {
        return res.status(500).json({ 
          message: "File upload service not configured. Please contact administrator." 
        });
      }

      const { jobId, coverLetter } = req.body;
      const applicantId = req.user?.id; // Get from auth middleware
      
      console.log('=== APPLICATION SUBMISSION DEBUG ===');
      console.log('Request body:', req.body);
      console.log('File:', req.file);
      console.log('User:', req.user);
      console.log('Headers:', req.headers);
      console.log('JobId type:', typeof jobId, 'Value:', jobId);
      console.log('CoverLetter type:', typeof coverLetter, 'Value:', coverLetter);
      console.log('=====================================');
      
      // Validate required fields
      if (!jobId || !coverLetter) {
        return res.status(400).json({ 
          message: "Missing required fields: jobId, coverLetter" 
        });
      }
      
      if (!req.file) {
        return res.status(400).json({ 
          message: "Resume file is required" 
        });
      }
      
      if (!applicantId) {
        return res.status(400).json({ 
          message: "User not authenticated" 
        });
      }
      
      // Validate jobId format (should be a valid MongoDB ObjectId)
      if (!jobId.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).json({ 
          message: "Invalid job ID format" 
        });
      }
      
      // Check if already applied
      const existing = await Application.findOne({ jobId, applicantId });
      if (existing) {
        return res.status(400).json({ message: "You already applied to this job" });
      }
      
      // Create application with Cloudinary URL
      const app = await Application.create({
        jobId,
        applicantId,
        coverLetter,
        resumeUrl: req.file.path, // Cloudinary URL
      });
      
      res.status(201).json({
        message: "Application submitted successfully",
        application: app
      });
    } catch (error: any) {
      console.error('Application creation error:', error);
      if (error.message && error.message.includes('Invalid file type')) {
        return res.status(400).json({ message: error.message });
      }
      res.status(500).json({ message: "Failed to create application" });
    }
  }
);

// Legacy route with file upload (keep for backward compatibility)
router.post(
  "/",
  auth,
  permit("applicant", "admin"),
  upload.single("resume"),
  applyJob
);

// Get user applications
router.get("/:userId", auth, userApplications);

// Get applicants for a specific job (employer only)
router.get("/job/:jobId", auth, permit("employer", "admin"), applicantsForJob);

// Get detailed application information (employer only)
router.get("/details/:id", auth, permit("employer", "admin"), getApplicationDetails);

// Get employer's jobs with applicant counts
router.get("/employer/jobs", auth, permit("employer", "admin"), getEmployerJobsWithApplicants);

// Admin routes
router.get("/admin/stats/all", auth, permit("admin"), adminStats);
router.get("/admin/dashboard", auth, permit("admin"), adminDashboard);

// Update application status (employer/admin only)
router.put(
  "/:id/status",
  auth,
  permit("employer", "admin"),
  updateApplicationStatus
);

// Delete application (employer/admin only)
router.delete(
  "/:id",
  auth,
  permit("employer", "admin"),
  deleteApplication
);

export default router;
