import { Server as SocketIOServer } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import Notification from '../models/Notification';

interface AuthenticatedSocket extends Socket {
  userId?: string;
  userRole?: string;
}

interface Socket {
  id: string;
  userId?: string;
  userRole?: string;
  join: (room: string) => void;
  leave: (room: string) => void;
  emit: (event: string, data: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  disconnect: () => void;
}

export class SocketService {
  private io: SocketIOServer;

  constructor(server: HTTPServer) {
    this.io = new SocketIOServer(server, {
      cors: {
        origin: env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true
      }
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  private setupMiddleware() {
    this.io.use(async (socket: AuthenticatedSocket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '');
        
        if (!token) {
          return next(new Error('Authentication error'));
        }

        const decoded = jwt.verify(token, env.JWT_SECRET) as any;
        socket.userId = decoded.id;
        socket.userRole = decoded.role;
        next();
      } catch (error) {
        next(new Error('Authentication error'));
      }
    });
  }

  private setupEventHandlers() {
    this.io.on('connection', (socket: AuthenticatedSocket) => {
      console.log(`User ${socket.userId} (${socket.userRole}) connected`);

      // Join user-specific room
      if (socket.userId) {
        socket.join(`user_${socket.userId}`);
      }

      // Join role-specific room
      if (socket.userRole) {
        socket.join(`role_${socket.userRole}`);
      }

      socket.on('disconnect', () => {
        console.log(`User ${socket.userId} disconnected`);
      });
    });
  }

  // Helper function to save notification to database
  private async saveNotification(recipientId: string, type: string, title: string, message: string, metadata: any = {}) {
    try {
      await Notification.create({
        recipientId,
        type,
        title,
        message,
        ...metadata
      });
    } catch (error) {
      console.error('Error saving notification to database:', error);
    }
  }

  // Notify employer about new application
  public async notifyNewApplication(jobId: string, employerId: string, applicationData: any) {
    const title = 'New Application Received';
    const message = `New application received for your job posting "${applicationData.job.title}"`;
    
    // Save to database
    await this.saveNotification(employerId, 'new_application', title, message, {
      jobId,
      applicationId: applicationData.id
    });
    
    // Send real-time notification
    this.io.to(`user_${employerId}`).emit('new_application', {
      type: 'new_application',
      jobId,
      application: applicationData,
      message,
      timestamp: new Date().toISOString()
    });
  }

  // Notify applicant about application status change
  public async notifyApplicationStatusChange(applicantId: string, jobId: string, status: string, jobTitle: string) {
    const title = 'Application Status Updated';
    const message = `Your application for "${jobTitle}" has been ${status}`;
    
    // Save to database
    await this.saveNotification(applicantId, 'application_status_change', title, message, {
      jobId,
      status
    });
    
    // Send real-time notification
    this.io.to(`user_${applicantId}`).emit('application_status_change', {
      type: 'application_status_change',
      jobId,
      status,
      jobTitle,
      message,
      timestamp: new Date().toISOString()
    });
  }

  // Notify applicant about shortlisting
  public async notifyShortlisted(applicantId: string, jobId: string, jobTitle: string) {
    const title = 'Application Shortlisted!';
    const message = `Congratulations! You've been shortlisted for "${jobTitle}"`;
    
    // Save to database
    await this.saveNotification(applicantId, 'shortlisted', title, message, {
      jobId
    });
    
    // Send real-time notification
    this.io.to(`user_${applicantId}`).emit('shortlisted', {
      type: 'shortlisted',
      jobId,
      jobTitle,
      message,
      timestamp: new Date().toISOString()
    });
  }

  // Notify applicant about rejection
  public async notifyRejected(applicantId: string, jobId: string, jobTitle: string) {
    const title = 'Application Update';
    const message = `Your application for "${jobTitle}" was not selected`;
    
    // Save to database
    await this.saveNotification(applicantId, 'rejected', title, message, {
      jobId
    });
    
    // Send real-time notification
    this.io.to(`user_${applicantId}`).emit('rejected', {
      type: 'rejected',
      jobId,
      jobTitle,
      message,
      timestamp: new Date().toISOString()
    });
  }

  // Notify applicant about hiring
  public async notifyHired(applicantId: string, jobId: string, jobTitle: string) {
    const title = 'Congratulations! You\'re Hired!';
    const message = `Congratulations! You've been hired for "${jobTitle}"`;
    
    // Save to database
    await this.saveNotification(applicantId, 'hired', title, message, {
      jobId
    });
    
    // Send real-time notification
    this.io.to(`user_${applicantId}`).emit('hired', {
      type: 'hired',
      jobId,
      jobTitle,
      message,
      timestamp: new Date().toISOString()
    });
  }

  // Get IO instance for external use
  public getIO() {
    return this.io;
  }
}
