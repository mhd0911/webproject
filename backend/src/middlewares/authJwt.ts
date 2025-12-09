// backend/src/middlewares/authJwt.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret123";

export interface JwtPayload {
  id: number;
  username: string;
}

/**
 * Middleware kiểm tra token JWT trong header Authorization: Bearer <token>
 */
export function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Lưu thông tin user vào req nếu cần dùng sau này
    (req as any).userId = decoded.id;
    (req as any).username = decoded.username;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}
