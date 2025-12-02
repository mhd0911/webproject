import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
interface AuthenticatedRequest extends Request {
  userId?: number;
  role?: 'Admin' | 'Staff';
}
const SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const verifyToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  let token = req.headers['x-access-token'] as string | undefined;

  if (!token) {
    return res.status(403).send({ message: 'Không tìm thấy Token xác thực!' });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Không được phép! Token không hợp lệ hoặc đã hết hạn.' });
    }
    const user = decoded as { id: number; role: 'Admin' | 'Staff' };
    req.userId = user.id;
    req.role = user.role;
    next();
  });
};

export const isAdmin = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.role === 'Admin') {
    next();
    return;
  }
  res.status(403).send({ message: 'Yêu cầu quyền Admin!' });
};

export const isStaff = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  if (req.role === 'Admin' || req.role === 'Staff') {
    next();
    return;
  }
  res.status(403).send({ message: 'Yêu cầu quyền Staff (hoặc Admin)!' });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isStaff,
};

export default authJwt;