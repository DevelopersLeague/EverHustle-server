import 'reflect-metadata';
import './config/tsyringe.config';
import './config/env.config';
import { container } from 'tsyringe';
import cron from 'node-cron';
import { App } from './app';
import mongoose from 'mongoose';
import { logger } from './common';
import { env } from './config/env.config';
import { AuthController } from './modules/auth';
import { NotesController } from './modules/note';
import { FocusTimeController } from './modules/focustime/focustime.controller';
import { GoalController } from './modules/goal/goal.controller';
import { ReminderController } from './modules/reminder/reminder.controller';
import { tokens } from './config/tokens.config';
import { IReminderService } from './modules/reminder/reminder.service.interface';

// const myApp = new App([AuthController, NotesController]);
// myApp.expressApp.listen(env.PORT, () => {
//   logger.info(`server started at port ${env.PORT}`);
// });

const reminderService = container.resolve<IReminderService>(
  tokens.REMINDER_SERVICE
);
cron.schedule('* * * * *', () => {
   reminderService.respondActiveReminders().catch(console.error);
});
mongoose
  .connect(env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // authSource: 'admin',
  })
  .then(() => {
    logger.info('database connection successful');
    const myApp = new App([
      AuthController,
      NotesController,
      FocusTimeController,
      GoalController,
      ReminderController,
    ]);
    myApp.expressApp.listen(env.PORT, () => {
      logger.info(`server started at port ${env.PORT}`);
    });
  })
  .catch((err) => {
    logger.error(`connection failed\n ${err.stack}`);
  });
