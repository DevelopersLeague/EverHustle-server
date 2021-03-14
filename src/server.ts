import 'reflect-metadata';
import './config/env.config';
import { App } from './app';
import mongoose from 'mongoose';
import { logger } from './common';
import { env } from './config/env.config';
import { AuthController } from './modules/auth';

mongoose
  .connect(env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // authSource: 'admin',
  })
  .then(() => {
    logger.info('database connection successful');
    const myApp = new App([AuthController]);
    myApp.expressApp.listen(env.PORT, () => {
      logger.info(`server started at port ${env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`connection failed\n ${err.stack}`);
  });
