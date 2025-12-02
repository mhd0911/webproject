import { Request, Response } from 'express';
import { Product, Order, Customer, OrderItem } from '../model';

export const getInventoryStatus = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      attributes: ['id', 'name', 'stockQuantity', 'status'],
      order: [['stockQuantity', 'ASC']],
    });

    const totalProducts = products.length;
    const totalStock = products.reduce((sum, p) => sum + p.stockQuantity, 0);
    const lowStockCount = products.filter(p => p.stockQuantity < 10 && p.stockQuantity > 0).length;
    const outOfStockCount = products.filter(p => p.stockQuantity === 0).length;

    res.status(200).send({
      totalProducts,
      totalStock,
      lowStockCount,
      outOfStockCount,
      details: products,
    });
  } catch (error: any) {
    res.status(500).send({ message: 'Lỗi khi thống kê tồn kho.' });
  }
};

export const getCustomerHistory = async (req: Request, res: Response) => {
  try {
    const customerId = parseInt(req.params.customerId);

    if (isNaN(customerId)) {
      return res.status(400).send({ message: 'Mã khách hàng không hợp lệ.' });
    }

    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(404).send({ message: 'Không tìm thấy khách hàng.' });
    }

    const orders = await Order.findAll({
      where: { customerId },
      attributes: ['id', 'orderDate', 'totalAmount'],
      include: [
        {
          model: OrderItem,
          as: 'items',
          attributes: ['quantity', 'priceAtPurchase'],
          include: [{ model: Product, as: 'product', attributes: ['name', 'id'] }],
        },
      ],
      order: [['orderDate', 'DESC']],
    });

    res.status(200).send({
      customerInfo: customer,
      history: orders,
      totalOrders: orders.length,
    });
  } catch (error: any) {
    res.status(500).send({ message: 'Lỗi khi thống kê lịch sử mua hàng.' });
  }
};

