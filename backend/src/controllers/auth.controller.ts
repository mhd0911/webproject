import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../model';

const SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

export const signup = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const user = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role || 'Staff',
    });

    res.status(201).send({ message: 'Đăng ký người dùng thành công!', id: user.id });
  } catch (error: any) {
    res.status(500).send({ message: error.message || 'Lỗi khi đăng ký.' });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });

    if (!user) {
      return res.status(404).send({ message: 'Người dùng không tồn tại.' });
    }

    const passwordIsValid = await bcrypt.compare(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: 'Sai mật khẩu!' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, {
      expiresIn: 86400, // 24 giờ
    });

    res.status(200).send({
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      accessToken: token,
    });
  } catch (error: any) {
    res.status(500).send({ message: error.message || 'Lỗi khi đăng nhập.' });
  }
};