import { Request, Response } from 'express';
import { createOrderWithTransaction } from '../services/order.service';
import { Order, Customer, OrderItem, Product } from '../model';

export const createOrder = async (req: Request, res: Response) => {
  const { customerId, items } = req.body;

  if (!customerId || !items || items.length === 0) {
    return res.status(400).send({ message: 'Thiếu thông tin khách hàng hoặc danh sách sản phẩm.' });
  }

  try {
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).send({ message: 'Khách hàng không tồn tại.' });
    }

    const newOrder = await createOrderWithTransaction(customerId, items);

    res.status(201).send({
      message: 'Tạo đơn hàng thành công và đã cập nhật tồn kho.',
      order: newOrder,
    });
  } catch (error: any) {
    res.status(400).send({ message: error.message || 'Lỗi khi tạo đơn hàng. Tồn kho đã được hoàn lại.' });
  }
};

export const findOrderDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {
      include: [
        { model: Customer, as: 'customer' },
        {
          model: OrderItem,
          as: 'items',
          include: [{ model: Product, as: 'product', attributes: ['name', 'id'] }]
        },
      ]
    });

    if (!order) {
      return res.status(404).send({ message: 'Không tìm thấy đơn hàng.' });
    }

    res.status(200).send(order);
  } catch (error: any) {
    res.status(500).send({ message: error.message || 'Lỗi khi lấy chi tiết đơn hàng.' });
  }
}