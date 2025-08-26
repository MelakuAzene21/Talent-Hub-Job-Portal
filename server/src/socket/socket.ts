import { Server as SocketIOServer, Socket as SocketIOSocket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import Notification from '../models/Notification';

interface AuthenticatedSocket extends SocketIOSocket {
  userId?: string;
  userRole?: string;
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
        console.log(`User ${socket.userId} joined room: user_${socket.userId}`);
      }

      // Join role-specific room
      if (socket.userRole) {
        socket.join(`role_${socket.userRole}`);
        console.log(`User ${socket.userId} joined room: role_${socket.userRole}`);
      }

      socket.on('disconnect', () => {
        console.log(`User ${socket.userId} disconnected`);
      });
    });
  }

  // Helper function to save notification to database
  private async saveNotification(recipientId: string | any, type: string, title: string, message: string, metadata: any = {}) {
    try {
      // Extract just the ID if recipientId is an object
      let actualRecipientId = recipientId;
      if (typeof recipientId === 'object' && recipientId !== null) {
        actualRecipientId = recipientId._id || recipientId.id;
      }
      
      // Validate recipientId is a valid ObjectId string
      if (!actualRecipientId || typeof actualRecipientId !== 'string' || !actualRecipientId.match(/^[0-9a-fA-F]{24}$/)) {
        console.error('Invalid recipientId for notification:', recipientId);
        console.error('Extracted ID:', actualRecipientId);
        return;
      }
      
      // Validate metadata jobId if present
      if (metadata.jobId && typeof metadata.jobId === 'string' && !metadata.jobId.match(/^[0-9a-fA-F]{24}$/)) {
        console.error('Invalid jobId in metadata:', metadata.jobId);
        // Remove invalid jobId from metadata
        delete metadata.jobId;
      }
      
      console.log('Creating notification with data:', {
        recipientId: actualRecipientId,
        type,
        title,
        message,
        metadata
      });
      
      const notification = await Notification.create({
        recipientId: actualRecipientId,
        type,
        title,
        message,
        ...metadata
      });
      
      console.log(`✅ Notification saved to database for user: ${actualRecipientId}`, notification._id);
    } catch (error) {
      console.error('❌ Error saving notification to database:', error);
      console.error('Notification data that failed:', {
        recipientId,
        type,
        title,
        message,
        metadata
      });
    }
  }

  // Notify employer about new application
  public async notifyNewApplication(jobId: string, employerId: string | any, applicationData: any) {
    const title = 'New Application Received';
    const message = `New application received for your job posting "${applicationData.job.title}"`;
    
    console.log(`📨 Sending new application notification to employer:`, employerId);
    
    // Extract just the ID if employerId is an object
    const recipientId = typeof employerId === 'object' ? (employerId._id || employerId.id) : employerId;
    console.log(`📨 Extracted recipient ID: ${recipientId} from:`, employerId);
    
    // Save to database
    await this.saveNotification(recipientId, 'new_application', title, message, {
      jobId,
      applicationId: applicationData.id
    });
    
    // Send real-time notification
    this.io.to(`user_${recipientId}`).emit('new_application', {
      type: 'new_application',
      jobId,
      application: applicationData,
      message,
      timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Real-time notification sent to room: user_${recipientId}`);
  }

  // Notify applicant about application status change
  public async notifyApplicationStatusChange(applicantId: string | any, jobId: string, status: string, jobTitle: string) {
    const title = 'Application Status Updated';
    const message = `Your application for "${jobTitle}" has been ${status}`;
    
    console.log(`📨 Sending status change notification to applicant:`, applicantId);
    
    // Extract just the ID if applicantId is an object
    const recipientId = typeof applicantId === 'object' ? (applicantId._id || applicantId.id) : applicantId;
    console.log(`📨 Extracted recipient ID: ${recipientId} from:`, applicantId);
    
    // Save to database
    await this.saveNotification(recipientId, 'application_status_change', title, message, {
      jobId,
      status
    });
    
    // Send real-time notification
    this.io.to(`user_${recipientId}`).emit('application_status_change', {
      type: 'application_status_change',
      jobId,
      status,
      jobTitle,
      message,
      timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Real-time notification sent to room: user_${recipientId}`);
  }

  // Notify applicant about shortlisting
  public async notifyShortlisted(applicantId: string | any, jobId: string, jobTitle: string) {
    const title = 'Application Shortlisted!';
    const message = `Congratulations! You've been shortlisted for "${jobTitle}"`;
    
    console.log(`📨 Sending shortlisted notification to applicant:`, applicantId);
    
    // Extract just the ID if applicantId is an object
    const recipientId = typeof applicantId === 'object' ? (applicantId._id || applicantId.id) : applicantId;
    console.log(`📨 Extracted recipient ID: ${recipientId} from:`, applicantId);
    
    // Save to database
    await this.saveNotification(recipientId, 'shortlisted', title, message, {
      jobId
    });
    
    // Send real-time notification
    this.io.to(`user_${recipientId}`).emit('shortlisted', {
      type: 'shortlisted',
      jobId,
      jobTitle,
      message,
      timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Real-time notification sent to room: user_${recipientId}`);
  }

  // Notify applicant about rejection
  public async notifyRejected(applicantId: string | any, jobId: string, jobTitle: string) {
    const title = 'Application Update';
    const message = `Your application for "${jobTitle}" was not selected`;
    
    console.log(`📨 Sending rejected notification to applicant:`, applicantId);
    
    // Extract just the ID if applicantId is an object
    const recipientId = typeof applicantId === 'object' ? (applicantId._id || applicantId.id) : applicantId;
    console.log(`📨 Extracted recipient ID: ${recipientId} from:`, applicantId);
    
    // Save to database
    await this.saveNotification(recipientId, 'rejected', title, message, {
      jobId
    });
    
    // Send real-time notification
    this.io.to(`user_${recipientId}`).emit('rejected', {
      type: 'rejected',
      jobId,
      jobTitle,
      message,
      timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Real-time notification sent to room: user_${recipientId}`);
  }

  // Notify applicant about hiring
  public async notifyHired(applicantId: string | any, jobId: string, jobTitle: string) {
    const title = 'Congratulations! You\'re Hired!';
    const message = `Congratulations! You've been hired for "${jobTitle}"`;
    
    console.log(`📨 Sending hired notification to applicant:`, applicantId);
    
    // Extract just the ID if applicantId is an object
    const recipientId = typeof applicantId === 'object' ? (applicantId._id || applicantId.id) : applicantId;
    console.log(`📨 Extracted recipient ID: ${recipientId} from:`, applicantId);
    
    // Save to database
    await this.saveNotification(recipientId, 'hired', title, message, {
      jobId
    });
    
    // Send real-time notification
    this.io.to(`user_${recipientId}`).emit('hired', {
      type: 'hired',
      jobId,
      jobTitle,
      message,
      timestamp: new Date().toISOString()
    });
    
    console.log(`✅ Real-time notification sent to room: user_${recipientId}`);
  }

  // Get IO instance for external use
  public getIO() {
    return this.io;
  }
}
