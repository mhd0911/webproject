import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";

export default class Customer extends Model {
  public id!: number;
  public name!: string;
  public phone!: string;
  public email!: string | null;
  public address!: string | null;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "customers",
    timestamps: true,
  }
);
