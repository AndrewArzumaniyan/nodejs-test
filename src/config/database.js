import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export const dbConfig = {
  username: process.env.DB_USER ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'balance_app',
  host: process.env.DB_HOST ?? 'localhost',
  dialect: 'postgres',
  logging: false
};

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging
  }
);