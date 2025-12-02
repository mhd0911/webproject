import { Request, Response } from 'express';
import { Customer } from '../model';

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).send(customer);
  } catch (error: any) {
    res.status(500).send({ message: error.message || 'Lỗi khi tạo khách hàng.' });
  }
};

export const findAllCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();
    res.status(200).send(customers);
  } catch (error: any) {
    res.status(500).send({ message: error.message || 'Lỗi khi lấy danh sách khách hàng.' });
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const [updated] = await Customer.update(req.body, { where: { id } });

    if (updated) {
      const updatedCustomer = await Customer.findByPk(id);
      return res.status(200).send(updatedCustomer);
    }
    throw new Error('Không tìm thấy khách hàng để cập nhật.');
  } catch (error: any) {
    res.status(500).send({ message: error.message || 'Lỗi khi cập nhật khách hàng.' });
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Customer.destroy({ where: { id } });

    if (deleted) {
      return res.status(200).send({ message: 'Xóa khách hàng thành công.' });
    }
    throw new Error('Không tìm thấy khách hàng để xóa.');
  } catch (error: any) {
    res.status(500).send({ message: error.message || 'Lỗi khi xóa khách hàng.' });
  }
};