import dotenv from 'dotenv';
dotenv.config();

if (!process.env.MONGO_URI) {
  throw new Error('provide a mongodb uri in .env file');
}

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: Number(process.env.PORT) || 8000,
  MONGO_URI: process.env.MONGO_URI,
  SALT_ROUNDS: Number(process.env.SALT_ROUNDS) || 10,
};
