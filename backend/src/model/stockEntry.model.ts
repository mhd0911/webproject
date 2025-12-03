import { DataTypes, Model } from 'sequelize';
import { db } from '../config/db';

class StockEntry extends Model {
  public id!: number;
  public entryDate!: Date;
  public supplier!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

StockEntry.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    entryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    supplier: {
      type: new DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: 'stockEntries',
    sequelize: db,
  }
);

export default StockEntry; 