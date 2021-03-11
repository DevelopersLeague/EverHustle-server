import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_USER) {
  throw new Error(
    'provide a mongodb username in .env file or environment variable'
  );
}
if (!process.env.MONGO_PASSWORD) {
  throw new Error(
    'provide a mongodb password in .env file or environment variable'
  );
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.NODE_ENV) || 8000,

  MONGO_USER: process.env.MONGO_USER,
  MONGO_PASSWORD: process.env.MONGO_PASSWORD,
  MONGO_DATABASE: process.env.MONGO_DATABASE || 'api',
  MONGO_PORT: process.env.MONGO_PORT || '27017',
  MONGO_HOST: process.env.MONGO_HOST || 'localhost',
};
