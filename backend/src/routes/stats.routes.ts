// backend/src/routes/stats.routes.ts
import { Router } from "express";
import { verifyToken } from "../middlewares/authJwt";
import Order from "../model/order.model";
import Customer from "../model/customer.model";
import Product from "../model/product.model";

const router = Router();

// Thống kê tổng quan
router.get("/overview", verifyToken, async (req, res) => {
  try {
    const [orderCount, customerCount, productCount] = await Promise.all([
      Order.count(),
      Customer.count(),
      Product.count(),
    ]);

    res.json({
      orders: orderCount,
      customers: customerCount,
      products: productCount,
    });
  } catch (error) {
    console.error("Stats overview error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
