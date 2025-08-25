import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import socketService from '../services/socket';

export const useSocket = () => {
  const { user } = useSelector((state: any) => state.auth);
  const isConnected = useRef(false);
  const [connectionStatus, setConnectionStatus] = useState(socketService.getConnectionStatus());

  useEffect(() => {
    // Get token from localStorage or auth state
    const token = localStorage.getItem('token') || user?.token;
    
    if (token && !isConnected.current) {
      console.log('🔌 Initializing Socket.io connection for user:', user?.name);
      
      // Add a small delay to ensure token is properly loaded
      const connectTimeout = setTimeout(() => {
        // Double-check token is still valid
        const currentToken = localStorage.getItem('token') || user?.token;
        if (currentToken && currentToken !== 'undefined' && currentToken !== 'null') {
          console.log('🔌 Connecting with token:', currentToken.substring(0, 20) + '...');
          socketService.connect(currentToken);
          isConnected.current = true;
          console.log('✅ Socket.io connection initiated');
        } else {
          console.log('🔌 No valid token found, skipping Socket.io connection');
        }
      }, 100); // Small delay to ensure localStorage is ready
      
      return () => clearTimeout(connectTimeout);
    } else if (!token && isConnected.current) {
      // Disconnect if no token
      console.log('🔌 Disconnecting Socket.io - no token found');
      socketService.disconnect();
      isConnected.current = false;
    }

    // Set up interval to check connection status
    const statusInterval = setInterval(() => {
      const status = socketService.getConnectionStatus();
      setConnectionStatus(status);
    }, 1000);

    return () => {
      clearInterval(statusInterval);
      if (isConnected.current) {
        // Disconnect when component unmounts or user logs out
        console.log('🔌 Cleaning up Socket.io connection');
        socketService.disconnect();
        isConnected.current = false;
      }
    };
  }, [user?.token, user?.name]);

  // Return socket service methods and status
  return {
    isConnected: socketService.isSocketConnected(),
    connectionStatus,
    emit: socketService.emit.bind(socketService),
    disconnect: socketService.disconnect.bind(socketService),
  };
};
