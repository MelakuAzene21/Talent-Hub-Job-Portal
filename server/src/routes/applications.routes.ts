import { Router } from "express";
import { auth, permit } from "../middleware/auth";
import {
  applyJob,
  userApplications,
  adminStats,
} from "../controllers/applications.controller";
import multer from "multer";
import { cloudinary } from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: "talenthub/resumes", resource_type: "raw" },
});
const upload = multer({ storage });
const router = Router();
router.post(
  "/",
  auth,
  permit("applicant", "admin"),
  upload.single("resume"),
  applyJob
);
router.get("/:userId", auth, userApplications);
router.get("/admin/stats/all", auth, permit("admin"), adminStats);
export default router;
