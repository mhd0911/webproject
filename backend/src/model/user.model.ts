import { DataTypes, Model } from 'sequelize';
import { db } from '../config/db';

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public role!: 'Admin' | 'Staff';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    email: {
      type: new DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    role: {
      type: new DataTypes.ENUM('Admin', 'Staff'),
      defaultValue: 'Staff',
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    sequelize: db,
  }
);

export default User; 