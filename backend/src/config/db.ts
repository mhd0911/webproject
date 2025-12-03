import { Sequelize } from 'sequelize';
import * as dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME || 'store_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'root',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
      freezeTableName: true,
    },
  }
);
export const db = sequelize;
export const connectDB = async () => {
  try {
    await db.authenticate();
    console.log('Kết nối Database thành công.');
  } catch (error) {
    console.error('Không thể kết nối Database:', error);
    process.exit(1);
  }
};