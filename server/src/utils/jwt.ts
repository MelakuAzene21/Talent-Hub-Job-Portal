import jwt from "jsonwebtoken";
import { env } from "../config/env";
export const signToken = (payload: object, expiresIn = "7d") =>
  jwt.sign(payload, env.JWT_SECRET, { expiresIn });
export const verifyToken = (token: string) => jwt.verify(token, env.JWT_SECRET);
