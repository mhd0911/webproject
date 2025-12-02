import { db, Product, Order, OrderItem } from '../model';
import { Transaction } from 'sequelize';

interface OrderItemData {
  productId: number;
  quantity: number;
}

export const createOrderWithTransaction = async (
  customerId: number,
  items: OrderItemData[]
) => {
  const t: Transaction = await db.transaction();

  try {
    let totalAmount = 0;
    const orderItemsToCreate: any[] = [];

    for (const item of items) {
      const product = await Product.findByPk(item.productId, { transaction: t });

      if (!product || product.status === 'Hidden') {
        throw new Error(`Sản phẩm ID ${item.productId} không tồn tại hoặc đã bị ẩn.`);
      }

      if (product.stockQuantity < item.quantity) {
        throw new Error(`Sản phẩm "${product.name}" chỉ còn ${product.stockQuantity} đơn vị. Không đủ số lượng ${item.quantity}.`);
      }

      const priceAtPurchase = parseFloat(product.price.toString());
      totalAmount += priceAtPurchase * item.quantity;

      orderItemsToCreate.push({
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: priceAtPurchase,
      });

      product.stockQuantity -= item.quantity;
      await product.save({ transaction: t });
    }

    const newOrder = await Order.create(
      {
        customerId,
        totalAmount,
        orderDate: new Date(),
      },
      { transaction: t }
    );

    const finalOrderItems = orderItemsToCreate.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));
    await OrderItem.bulkCreate(finalOrderItems, { transaction: t });

    await t.commit();
    return newOrder;

  } catch (error) {
    await t.rollback();
    throw error;
  }
};
