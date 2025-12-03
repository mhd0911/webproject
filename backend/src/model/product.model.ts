import { DataTypes, Model } from 'sequelize';
import { db } from '../config/db';

class Product extends Model {
  public id!: number;
  public name!: string;
  public price!: number;
  public stockQuantity!: number;
  public status!: 'Active' | 'Hidden';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.0,
    },
    stockQuantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: new DataTypes.ENUM('Active', 'Hidden'),
      defaultValue: 'Active',
      allowNull: false,
    },
  },
  {
    tableName: 'products',
    sequelize: db,
  }
);

export default Product; 