import { Request, Response } from 'express';
import { Product } from '../model';
import { Op } from 'sequelize';

export const findAllProducts = async (req: Request, res: Response) => {
  try {
    const condition = (req as any).role === 'Admin' ? {} : { status: 'Active' };
    const products = await Product.findAll({ where: condition });
    res.status(200).send(products);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).send(product);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, { where: { id } });

    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      return res.status(200).send(updatedProduct);
    }

    throw new Error('Không tìm thấy sản phẩm để cập nhật.');
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const toggleStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).send({ message: 'Không tìm thấy sản phẩm.' });
    }

    const newStatus = product.status === 'Active' ? 'Hidden' : 'Active';
    await product.update({ status: newStatus });

    return res.status(200).send({ message: `Đã đổi sang ${newStatus}`, newStatus });
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};

export const searchProducts = async (req: Request, res: Response) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).send({ message: 'Thiếu từ khóa tìm kiếm.' });
    }

    const products = await Product.findAll({
      where: {
        name: { [Op.like]: `%${query}%` }
      }
    });

    res.status(200).send(products);
  } catch (error: any) {
    res.status(500).send({ message: error.message });
  }
};
