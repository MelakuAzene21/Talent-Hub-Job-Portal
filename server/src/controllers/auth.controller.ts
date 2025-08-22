import { Request, Response } from "express";
import User from "../models/User";
import { signToken } from "../utils/jwt";
export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });
  const user = await User.create({ name, email, password, role });
  const token = signToken({ id: user._id, role: user.role, name: user.name });
  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });
  const token = signToken({ id: user._id, role: user.role, name: user.name });
  res.json({
    user: { id: user._id, name: user.name, email: user.email, role: user.role },
    token,
  });
};
export const me = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const user = await User.findById(userId).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user });
};

