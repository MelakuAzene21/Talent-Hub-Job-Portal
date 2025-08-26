import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const signToken = (payload: object, expiresIn: string | number = "7d") => {
  return jwt.sign(payload, env.JWT_SECRET as string, { expiresIn } as any);
};

export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET as string);
