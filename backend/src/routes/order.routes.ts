// backend/src/routes/order.routes.ts
import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import Order from "../model/order.model";
import OrderItem from "../model/orderItem.model";
import Product from "../model/product.model";

const router = Router();

// Lấy danh sách đơn hàng
router.get("/", verifyToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["id", "DESC"]],
      include: [OrderItem],
    });
    res.json(orders);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy chi tiết 1 đơn hàng
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const order = await Order.findByPk(id, {
      include: [OrderItem],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error("Get order detail error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Tạo đơn hàng mới (đơn giản)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { customerId, items, note, status } = req.body;
    // items: [{ productId, quantity, price }]

    const order = await Order.create(
      {
        customerId,
        note,
        status: status || "pending",
        OrderItems: items,
      },
      { include: [OrderItem] }
    );

    // Có thể trừ tồn kho ở đây tuỳ logic:
    if (items && Array.isArray(items)) {
      for (const it of items) {
        if (!it.productId || !it.quantity) continue;
        const product = await Product.findByPk(it.productId);
        if (product) {
          const newStock = (product.getDataValue("stock") || 0) - it.quantity;
          await product.update({ stock: newStock });
        }
      }
    }

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Cập nhật trạng thái đơn hàng
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status, note } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.update({ status, note });
    res.json(order);
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Xoá đơn hàng
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const id = Number(req.params.id);

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    await order.destroy();
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
