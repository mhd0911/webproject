// backend/src/model/order.model.ts
import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export default class Order extends Model {
  public id!: number;
  public customerId!: number;
  public totalAmount!: number;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    customerId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);
