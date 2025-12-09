// backend/src/model/stockEntryItem.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";
import StockEntry from "./stockEntry.model";
import Product from "./product.model";

export interface StockEntryItemAttributes {
  id: number;
  stockEntryId: number;
  productId: number;
  quantity: number;
  costPrice: number;
}

export type StockEntryItemCreationAttributes = Optional<
  StockEntryItemAttributes,
  "id"
>;

class StockEntryItem
  extends Model<StockEntryItemAttributes, StockEntryItemCreationAttributes>
  implements StockEntryItemAttributes
{
  declare id: number;
  declare stockEntryId: number;
  declare productId: number;
  declare quantity: number;
  declare costPrice: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
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
    costPrice: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "stock_entry_items",
    modelName: "StockEntryItem",
    timestamps: true,
  }
);

// Associations
StockEntryItem.belongsTo(StockEntry, {
  foreignKey: "stockEntryId",
  as: "stockEntry",
});
StockEntry.hasMany(StockEntryItem, {
  foreignKey: "stockEntryId",
  as: "items",
});

StockEntryItem.belongsTo(Product, { foreignKey: "productId", as: "product" });
Product.hasMany(StockEntryItem, {
  foreignKey: "productId",
  as: "stockItems",
});

export default StockEntryItem;
