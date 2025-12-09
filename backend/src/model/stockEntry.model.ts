import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export default class StockEntry extends Model {
  public id!: number;
  public date!: Date;
}

StockEntry.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "stock_entries",
    timestamps: true,
  }
);
