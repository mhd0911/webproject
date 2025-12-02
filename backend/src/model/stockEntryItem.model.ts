import { DataTypes, Model } from 'sequelize';
import { db } from '../config/db';
import StockEntry from './stockEntry.model';
import Product from './product.model';

class StockEntryItem extends Model {
  public id!: number;
  public stockEntryId!: number;
  public productId!: number;
  public quantityAdded!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StockEntryItem.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    stockEntryId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: StockEntry, key: 'id' },
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: { model: Product, key: 'id' },
    },
    quantityAdded: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    tableName: 'stockEntryItems',
    sequelize: db,
  }
);

export default StockEntryItem; 