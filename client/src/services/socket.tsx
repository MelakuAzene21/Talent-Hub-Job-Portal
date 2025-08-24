import { io, Socket } from 'socket.io-client';
import { toast } from 'react-hot-toast';

interface NotificationData {
  type: string;
  jobId: string;
  message: string;
  timestamp: string;
  application?: any;
  jobTitle?: string;
  status?: string;
}

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;

  connect(token: string) {
    if (this.socket?.connected) {
      return;
    }

    try {
      this.socket = io('http://localhost:5000', {
        auth: { token },
        transports: ['websocket', 'polling'],
        timeout: 20000,
      });

      this.setupEventListeners();
    } catch (error) {
      console.error('Failed to connect to Socket.io:', error);
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('Connected to Socket.io');
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io');
      this.isConnected = false;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket.io connection error:', error);
      this.handleReconnect();
    });

    // Handle different notification types
    this.socket.on('new_application', (data: NotificationData) => {
      this.handleNewApplicationNotification(data);
    });

    this.socket.on('application_status_change', (data: NotificationData) => {
      this.handleStatusChangeNotification(data);
    });

    this.socket.on('shortlisted', (data: NotificationData) => {
      this.handleShortlistedNotification(data);
    });

    this.socket.on('rejected', (data: NotificationData) => {
      this.handleRejectedNotification(data);
    });

    this.socket.on('hired', (data: NotificationData) => {
      this.handleHiredNotification(data);
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        if (this.socket) {
          this.socket.connect();
        }
      }, 2000 * this.reconnectAttempts);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  private handleNewApplicationNotification(data: NotificationData) {
    toast.success(
      <div>
        <div className="font-semibold"> New Application Received!</div>
        <div className="text-sm">{data.message}</div>
      </div>,
      {
        duration: 6000,
        position: 'top-right',
        style: {
          background: '#10b981',
          color: 'white',
        },
      }
    );
  }

  private handleStatusChangeNotification(data: NotificationData) {
    toast.info(
      <div>
        <div className="font-semibold">Application Status Updated</div>
        <div className="text-sm">{data.message}</div>
      </div>,
      {
        duration: 6000,
        position: 'top-right',
        style: {
          background: '#3b82f6',
          color: 'white',
        },
      }
    );
  }

  private handleShortlistedNotification(data: NotificationData) {
    toast.success(
      <div>
        <div className="font-semibold">🎉 Congratulations!</div>
        <div className="text-sm">{data.message}</div>
      </div>,
      {
        duration: 8000,
        position: 'top-right',
        style: {
          background: '#f59e0b',
          color: 'white',
        },
      }
    );
  }

  private handleRejectedNotification(data: NotificationData) {
    toast.error(
      <div>
        <div className="font-semibold">Application Update</div>
        <div className="text-sm">{data.message}</div>
      </div>,
      {
        duration: 8000,
        position: 'top-right',
        style: {
          background: '#ef4444',
          color: 'white',
        },
      }
    );
  }

  private handleHiredNotification(data: NotificationData) {
    toast.success(
      <div>
        <div className="font-semibold">🎊 You're Hired!</div>
        <div className="text-sm">{data.message}</div>
      </div>,
      {
        duration: 10000,
        position: 'top-right',
        style: {
          background: '#10b981',
          color: 'white',
        },
      }
    );
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  isSocketConnected() {
    return this.isConnected && this.socket?.connected;
  }

  // Method to manually emit events (if needed)
  emit(event: string, data: any) {
    if (this.socket?.connected) {
      this.socket.emit(event, data);
    }
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;
