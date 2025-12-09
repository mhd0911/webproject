// backend/src/model/user.model.ts
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/db";

export interface UserAttributes {
  id: number;
  fullName: string;
  username: string;
  password: string;
  birthday: Date | null;
  address: string | null;
}

export type UserCreationAttributes = Optional<UserAttributes, "id">;

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  declare id: number;
  declare fullName: string;
  declare username: string;
  declare password: string;
  declare birthday: Date | null;
  declare address: string | null;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize, // ⭐ QUAN TRỌNG
    tableName: "users",
    modelName: "User",
    timestamps: true,
  }
);

export default User;
