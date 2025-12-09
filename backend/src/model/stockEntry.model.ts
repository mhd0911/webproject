// backend/src/model/stockEntry.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export interface StockEntryAttributes {
  id: number;
  code: string;
  note: string | null;
}

export type StockEntryCreationAttributes = Optional<StockEntryAttributes, "id">;

class StockEntry
  extends Model<StockEntryAttributes, StockEntryCreationAttributes>
  implements StockEntryAttributes
{
  declare id: number;
  declare code: string;
  declare note: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

StockEntry.init(
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
    note: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "stock_entries",
    modelName: "StockEntry",
    timestamps: true,
  }
);

export default StockEntry;
