import { NextFunction, Request, Response } from "express";
import  jwt ,{ JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export interface AuthRequest extends Request {
  user?: JwtPayload | string;
}

export const isAuthenticated = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
    const token = authHeader.slice(7);
    if (!process.env.JWT_TOKEN) {
      throw new Error("JWT_TOKEN not defined");
    }
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Invalid or expired token",
    });
  }
};
