// backend/src/model/customer.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export interface CustomerAttributes {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  address: string | null;
}

export type CustomerCreationAttributes = Optional<CustomerAttributes, "id">;

class Customer
  extends Model<CustomerAttributes, CustomerCreationAttributes>
  implements CustomerAttributes
{
  declare id: number;
  declare name: string;
  declare phone: string;
  declare email: string | null;
  declare address: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "customers",
    modelName: "Customer",
    timestamps: true,
  }
);

export default Customer;
