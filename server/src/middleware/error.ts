import { Request, Response, NextFunction } from "express";
export const notFound = (_: Request, res: Response) =>
  res.status(404).json({ message: "Not Found" });
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error" });
};
