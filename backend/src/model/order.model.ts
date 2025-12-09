// backend/src/model/order.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import Customer from "./customer.model";

export interface OrderAttributes {
  id: number;
  code: string;
  customerId: number;
  totalAmount: number;
  status: string;
}

export type OrderCreationAttributes = Optional<OrderAttributes, "id">;

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  declare id: number;
  declare code: string;
  declare customerId: number;
  declare totalAmount: number;
  declare status: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    customerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "pending",
    },
  },
  {
    sequelize,
    tableName: "orders",
    modelName: "Order",
    timestamps: true,
  }
);

// Associations
Order.belongsTo(Customer, { foreignKey: "customerId", as: "customer" });
Customer.hasMany(Order, { foreignKey: "customerId", as: "orders" });

export default Order;
