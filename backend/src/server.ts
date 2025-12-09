// backend/src/server.ts
import express from "express";
import cors from "cors";

import sequelize from "./config/db";   // ⬅ NHỚ: import default, KHÔNG có ngoặc nhọn
import { syncModels } from "./model";  // ./model/index.ts

import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import productRoutes from "./routes/product.routes";
import orderRoutes from "./routes/order.routes";
import stockRoutes from "./routes/stock.routes";
import statsRoutes from "./routes/stats.routes";

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/stats", statsRoutes);

async function start() {
  try {
    // 1. Kết nối DB
    await sequelize.authenticate();
    console.log("✅ Kết nối MySQL thành công");

    // 2. Đồng bộ model -> tự tạo bảng nếu chưa có
    await syncModels();
    console.log("✅ Đồng bộ model xong");

    // 3. Chạy server
    const PORT = 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Lỗi kết nối DB:", err);
    process.exit(1); // tắt server nếu DB lỗi để FE không gọi hoài 500
  }
}

start();
