// backend/src/model/index.ts
import User from "./user.model";
import Customer from "./customer.model";
import Product from "./product.model";
import Order from "./order.model";
import OrderItem from "./orderItem.model";
import StockEntry from "./stockEntry.model";
import StockEntryItem from "./stockEntryItem.model";
import { sequelize } from "../config/db";

export {
  User,
  Customer,
  Product,
  Order,
  OrderItem,
  StockEntry,
  StockEntryItem,
  sequelize,
};

export async function syncModels() {
  await sequelize.sync({ alter: true }); // hoặc { force: true } nếu muốn drop & tạo lại
}
