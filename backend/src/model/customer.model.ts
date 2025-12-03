import { DataTypes, Model } from 'sequelize';
import { db } from '../config/db';

class Customer extends Model {
  public id!: number;
  public fullName!: string;
  public birthYear?: number;
  public address?: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    birthYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    address: {
      type: new DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: 'customers',
    sequelize: db,
  }
);

export default Customer; 