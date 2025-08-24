import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import socketService from '../services/socket';

export const useSocket = () => {
  const { user } = useSelector((state: any) => state.auth);
  const isConnected = useRef(false);

  useEffect(() => {
    if (user?.token && !isConnected.current) {
      // Connect to Socket.io when user logs in
      socketService.connect(user.token);
      isConnected.current = true;
      
      console.log('Socket.io connected for user:', user.name);
    }

    return () => {
      if (isConnected.current) {
        // Disconnect when component unmounts or user logs out
        socketService.disconnect();
        isConnected.current = false;
        console.log('Socket.io disconnected');
      }
    };
  }, [user?.token]);

  // Return socket service methods
  return {
    isConnected: socketService.isSocketConnected(),
    emit: socketService.emit.bind(socketService),
    disconnect: socketService.disconnect.bind(socketService),
  };
};
