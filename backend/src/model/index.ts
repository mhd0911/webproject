import { db } from '../config/db';
import User from './user.model';
import Product from './product.model';
import Customer from './customer.model';
import Order from './order.model';
import OrderItem from './orderItem.model';
import StockEntry from './stockEntry.model';
import StockEntryItem from './stockEntryItem.model';


const setupAssociations = () => {

  Customer.hasMany(Order, { foreignKey: 'customerId', as: 'orders' });
  Order.belongsTo(Customer, { foreignKey: 'customerId', as: 'customer' });

  Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
  OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });

  Product.hasMany(OrderItem, { foreignKey: 'productId', as: 'orderItems' });
  OrderItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });

  StockEntry.hasMany(StockEntryItem, { foreignKey: 'stockEntryId', as: 'items' });
  StockEntryItem.belongsTo(StockEntry, { foreignKey: 'stockEntryId', as: 'stockEntry' });

  Product.hasMany(StockEntryItem, { foreignKey: 'productId', as: 'stockEntryItems' });
  StockEntryItem.belongsTo(Product, { foreignKey: 'productId', as: 'product' });
};

setupAssociations();

export {
  db,
  User,
  Product,
  Customer,
  Order,
  OrderItem,
  StockEntry,
  StockEntryItem,
};