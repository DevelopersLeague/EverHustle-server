import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('provide a mongodb uri in .env file');
}

if (!process.env.SENDGRID_API_KEY) {
  throw new Error('provide a SENDGRID_API_KEY in .env file');
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 8000,
  MONGO_URI: process.env.MONGO_URI,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  SERVER_URL: process.env.SERVER_URL || 'http://localhost:8000',
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY || 'secret_key',
};
