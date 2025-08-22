import { Router } from "express";
import { auth, permit } from "../middleware/auth";
import { listJobs, createJob, removeJob } from "../controllers/jobs.controller";
const router = Router();
router.get("/", listJobs);
router.post("/", auth, permit("employer", "admin"), createJob);
router.delete("/:id", auth, removeJob);
export default router;
