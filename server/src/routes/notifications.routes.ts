import { Router } from "express";
import { auth } from "../middleware/auth";
import { permit } from "../middleware/auth";
import {
  getUserNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  deleteNotification,
  getNotificationCount
} from "../controllers/notifications.controller";

const router = Router();

// All notification routes require authentication
router.use(auth);

// Get user notifications
router.get("/", getUserNotifications);

// Get notification count
router.get("/count", getNotificationCount);

// Mark notification as read
router.put("/:id/read", markNotificationAsRead);

// Mark all notifications as read
router.put("/read-all", markAllNotificationsAsRead);

// Delete notification
router.delete("/:id", deleteNotification);

export default router;
