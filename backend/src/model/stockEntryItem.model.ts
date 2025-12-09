import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export default class StockEntryItem extends Model {
  public id!: number;
  public stockEntryId!: number;
  public productId!: number;
  public quantity!: number;
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
    },
    productId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "stock_entry_items",
    timestamps: true,
  }
);
