import { io, Socket } from 'socket.io-client';
import { toast } from 'react-hot-toast';

interface ConnectionStatus {
  isConnected: boolean;
  socketConnected: boolean;
  socketId: string | null;
  error: string | null;
}

export class SocketService {
  private socket: Socket | null = null;
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private authRetryAttempts: number = 0;
  private maxAuthRetries: number = 3;
  public connectionStatus: ConnectionStatus = {
    isConnected: false,
    socketConnected: false,
    socketId: null,
    error: null
  };

  connect(token: string) {
    if (this.socket) {
      console.log('🔌 Socket already connected, disconnecting first...');
      this.disconnect();
    }

    // Reset retry counters
    this.reconnectAttempts = 0;
    this.authRetryAttempts = 0;

    console.log('🔌 Attempting to connect to Socket.io server...');
    console.log('🔌 Token:', token ? `${token.substring(0, 20)}...` : 'No token');
    
    try {
      this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:5000', {
        auth: { token },
        transports: ['websocket', 'polling'],
        timeout: 20000,
        forceNew: true
      });

      this.setupEventListeners();
      this.setupReconnect();
      
      console.log('🔌 Socket.io connection initiated');
    } catch (error) {
      console.error('❌ Error creating Socket.io connection:', error);
      this.updateConnectionStatus(false, false, null, error instanceof Error ? error.message : 'Connection failed');
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('✅ Socket.io connected successfully!');
      console.log('🔌 Socket ID:', this.socket?.id);
      this.isConnected = true;
      this.updateConnectionStatus(true, true, this.socket?.id || null, null);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('❌ Socket.io disconnected:', reason);
      this.isConnected = false;
      this.updateConnectionStatus(false, false, null, reason);
    });

    this.socket.on('connect_error', (error) => {
      console.error('❌ Socket.io connection error:', error);
      this.isConnected = false;
      
      // Handle authentication errors specifically
      if (error.message === 'Authentication error') {
        console.log('🔐 Authentication error - token may be invalid or expired');
        
        // Try to retry authentication if we haven't exceeded max attempts
        if (this.authRetryAttempts < this.maxAuthRetries) {
          this.authRetryAttempts++;
          console.log(`🔄 Authentication retry attempt ${this.authRetryAttempts}/${this.maxAuthRetries}`);
          
          // Wait a bit before retrying
          setTimeout(() => {
            const currentToken = localStorage.getItem('token');
            if (currentToken && currentToken !== 'undefined' && currentToken !== 'null') {
              console.log('🔄 Retrying connection with token...');
              this.connect(currentToken);
            }
          }, 1000 * this.authRetryAttempts); // Exponential backoff
        } else {
          console.log('❌ Max authentication retry attempts reached');
          this.updateConnectionStatus(false, false, null, 'Authentication failed after retries');
        }
      } else {
        this.updateConnectionStatus(false, false, null, error.message);
      }
    });

    // Notification events
    this.socket.on('new_application', (data) => {
      console.log('📨 Received new_application notification:', data);
      this.handleNewApplicationNotification(data);
    });

    this.socket.on('application_status_change', (data) => {
      console.log('📨 Received application_status_change notification:', data);
      this.handleStatusChangeNotification(data);
    });

    this.socket.on('shortlisted', (data) => {
      console.log('📨 Received shortlisted notification:', data);
      this.handleShortlistedNotification(data);
    });

    this.socket.on('rejected', (data) => {
      console.log('📨 Received rejected notification:', data);
      this.handleRejectedNotification(data);
    });

    this.socket.on('hired', (data) => {
      console.log('📨 Received hired notification:', data);
      this.handleHiredNotification(data);
    });
  }

  private updateConnectionStatus(isConnected: boolean, socketConnected: boolean, socketId: string | null, error: string | null) {
    this.connectionStatus = {
      isConnected,
      socketConnected,
      socketId,
      error
    };
    console.log('🔌 Connection status updated:', this.connectionStatus);
  }

  private setupReconnect() {
    if (!this.socket) return;

    this.socket.on('disconnect', (reason) => {
      if (reason === 'io server disconnect') {
        // Server disconnected us, try to reconnect
        console.log('🔄 Server disconnected, attempting to reconnect...');
        setTimeout(() => {
          if (this.socket) {
            this.socket.connect();
          }
        }, 1000);
      }
    });
  }

  private handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      
      console.log(`🔄 Attempting to reconnect in ${delay}ms (attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      
      setTimeout(() => {
        if (this.socket && !this.socket.connected) {
          this.socket.connect();
        }
      }, delay);
    } else {
      console.error('❌ Max reconnection attempts reached');
      this.updateConnectionStatus(false, false, null, 'Max reconnection attempts reached');
    }
  }

  private handleNewApplicationNotification(data: any) {
    toast.success(`New application received for ${data.job?.title || 'your job posting'}`, {
      duration: 5000,
      position: 'top-right'
    });
  }

  private handleStatusChangeNotification(data: any) {
    toast.success(`Application status updated: ${data.status}`, {
      duration: 5000,
      position: 'top-right'
    });
  }

  private handleShortlistedNotification(data: any) {
    toast.success(`🎉 Congratulations! You've been shortlisted for ${data.jobTitle}`, {
      duration: 8000,
      position: 'top-right'
    });
  }

  private handleRejectedNotification(data: any) {
    toast.error(`Application for ${data.jobTitle} was not selected`, {
      duration: 8000,
      position: 'top-right'
    });
  }

  private handleHiredNotification(data: any) {
    toast.success(`🎊 Congratulations! You've been hired for ${data.jobTitle}!`, {
      duration: 10000,
      position: 'top-right'
    });
  }

  disconnect() {
    if (this.socket) {
      console.log('🔌 Disconnecting Socket.io...');
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.updateConnectionStatus(false, false, null, null);
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

  // Get connection status
  getConnectionStatus() {
    return this.connectionStatus;
  }

  // Get the socket instance for external use
  getSocket() {
    return this.socket;
  }
}

// Create a singleton instance
const socketService = new SocketService();
export default socketService;
