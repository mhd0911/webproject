import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.model";
import { AuthRequest } from "../middlewares/authJwt";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";
const JWT_EXPIRES_IN = "7d";

// Đăng ký
export const register = async (req: Request, res: Response) => {
  try {
    const { fullName, username, password, dateOfBirth, address } = req.body;

    if (!fullName || !username || !password) {
      return res.status(400).json({ message: "Thiếu thông tin bắt buộc" });
    }

    const existing = await User.findOne({ where: { username } });
    if (existing) {
      return res.status(409).json({ message: "Username đã tồn tại" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      password: hash,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      address: address || null,
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Đăng nhập
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Sai username hoặc password" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Sai username hoặc password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.json({
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        dateOfBirth: user.dateOfBirth,
        address: user.address,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy thông tin user từ token
export const getMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Chưa đăng nhập" });
    }

    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User không tồn tại" });
    }

    res.json({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      dateOfBirth: user.dateOfBirth,
      address: user.address,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
