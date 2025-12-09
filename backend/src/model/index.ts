// backend/src/model/index.ts
import sequelize from "../config/db";
import User from "./user.model";
import Customer from "./customer.model";
import Product from "./product.model";
import Order from "./order.model";
import OrderItem from "./orderItem.model";
import StockEntry from "./stockEntry.model";
import StockEntryItem from "./stockEntryItem.model";

// ─── Associations ──────────────────────────────────────────────

// User - (không FK tới bảng khác nên bỏ qua)

// Customer - Order
Customer.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(Customer, { foreignKey: "customerId" });

// Order - OrderItem
Order.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Order, { foreignKey: "orderId" });

// Product - OrderItem
Product.hasMany(OrderItem, { foreignKey: "productId" });
OrderItem.belongsTo(Product, { foreignKey: "productId" });

// StockEntry - StockEntryItem
StockEntry.hasMany(StockEntryItem, { foreignKey: "stockEntryId" });
StockEntryItem.belongsTo(StockEntry, { foreignKey: "stockEntryId" });

// Product - StockEntryItem
Product.hasMany(StockEntryItem, { foreignKey: "productId" });
StockEntryItem.belongsTo(Product, { foreignKey: "productId" });

// ─── Sync ──────────────────────────────────────────────────────

export async function syncModels() {
  await sequelize.sync({ alter: true }); // hoặc force: true nếu muốn xóa tạo lại
}

export {
  User,
  Customer,
  Product,
  Order,
  OrderItem,
  StockEntry,
  StockEntryItem,
};
