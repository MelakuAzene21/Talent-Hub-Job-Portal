declare var global: any;

declare namespace Express {
  export interface Request {
    user?: { id: string; role: string };
    file?: Express.Multer.File;
  }
}

import { Socket } from "socket.io";
export interface AuthenticatedSocket extends Socket {
  user?: { _id: string; id: string; role?: string };
}
