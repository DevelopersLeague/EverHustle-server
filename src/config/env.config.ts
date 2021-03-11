import dotenv from 'dotenv';
dotenv.config();
export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_DATABASE: process.env.MONGO_DATABASE,
  MONGO_PORT: process.env.MONGO_PORT,
  MONGO_HOST: process.env.MONGO_HOST,
};
