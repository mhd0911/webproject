import { DataTypes, Model } from 'sequelize';
import { db } from '../config/db';
import Customer from './customer.model';

class Order extends Model {
  public id!: number;
  public customerId!: number;
  public orderDate!: Date;
  public totalAmount!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
      references: { model: Customer, key: 'id' },
    },
    orderDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
  },
  {
    tableName: 'orders',
    sequelize: db,
  }
);

export default Order; 