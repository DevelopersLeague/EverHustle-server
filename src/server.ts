import 'reflect-metadata';
import './config/env.config';
import { App } from './app';
import mongoose from 'mongoose';
import { logger } from './common';
import { env } from './config/env.config';

const myApp = new App([]);
myApp.expressApp.listen(env.PORT, () => {
  logger.info(`server started at port ${env.PORT}`);
});

// mongoose
//   .connect(
//     `mongodb://${env.MONGO_USER}:${env.MONGO_PASSWORD}@${env.MONGO_HOST}/${env.MONGO_DATABASE}`,
//     {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       authSource: 'admin',
//     }
//   )
//   .then(() => {
//     logger.info('database connection successful');
//     const myApp = new App([]);
//     myApp.expressApp.listen(3000, () => {
//       logger.info('server started at port 3000');
//     });
//   })
//   .catch((err) => {
//     logger.error(`connection failed Error:\n ${err.stack}`);
//   });
