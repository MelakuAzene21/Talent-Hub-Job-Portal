import { env } from "./config/env";
import { connectDB } from "./db/connect";
import { createServer } from "http";
import app from "./app";
import { SocketService } from "./socket/socket";

connectDB().then(() => {
  const server = createServer(app);
  
  // Initialize Socket.io
  const socketService = new SocketService(server);
  
  // Make socket service available globally
  (global as any).socketService = socketService;
  
  server.listen(env.PORT, () => {
    console.log(`API on http://localhost:${env.PORT}`);
    console.log(`Socket.io initialized`);
  });
});
