import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import jobRoutes from "./routes/jobs.routes";
import applicationRoutes from "./routes/applications.routes";
import savedJobRoutes from "./routes/savedJobs.routes";
import notificationRoutes from "./routes/notifications.routes";
import statsRoutes from "./routes/stats.routes";
import { notFound, errorHandler } from "./middleware/error";

const app = express();

app.use(cors({ origin: env.CLIENT_URL, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => res.json({ ok: true, name: "TalentHub API" }));

// Debug: Log route registration
console.log("🔧 Registering routes...");

app.use("/auth", authRoutes);
console.log("✅ Auth routes registered");

app.use("/jobs", jobRoutes);
console.log("✅ Job routes registered");

app.use("/applications", applicationRoutes);
console.log("✅ Application routes registered");

app.use("/saved-jobs", savedJobRoutes);
console.log("✅ Saved jobs routes registered");

app.use("/notifications", notificationRoutes);
console.log("✅ Notification routes registered");

app.use("/stats", statsRoutes);
console.log("✅ Stats routes registered");

// Debug: Test stats endpoint
app.get("/test-stats", async (_req, res) => {
  try {
    const Job = require("./models/Job");
    const User = require("./models/User");
    
    const jobsCount = await Job.countDocuments();
    const usersCount = await User.countDocuments();
    
    res.json({
      message: "Test stats endpoint working",
      jobsCount,
      usersCount,
      models: {
        Job: Job ? "Loaded" : "Not loaded",
        User: User ? "Loaded" : "Not loaded"
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Test stats endpoint error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

app.use(notFound);
app.use(errorHandler);

export default app;
