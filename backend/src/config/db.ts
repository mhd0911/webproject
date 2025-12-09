// backend/src/config/db.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,      // projectweb
  process.env.DB_USER as string,      // projectweb
  process.env.DB_PASS as string,      // mật khẩu
  {
    host: process.env.DB_HOST,        // localhost
    port: Number(process.env.DB_PORT) || 3306,
    dialect: "mysql",
    logging: false,
  }
);

export default sequelize;
