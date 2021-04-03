import { Model } from 'mongoose';
import { registry, instanceCachingFactory } from 'tsyringe';
import { IUser, User, UserService } from '../modules/user';
import { tokens } from './tokens.config';
import { sgMail } from './sgmail.config';
import { NotesService, Note } from '../modules/note';
import { EmailService } from '../modules/email';
import { FocusTime } from '../modules/focustime/focustime.model';
import { FocusTimeService } from '../modules/focustime/focustime.service';
import { Goal } from '../modules/goal/goal.model';
import { ReminderService } from '../modules/reminder/reminder.service';
import { Reminder } from '../modules/reminder/reminder.model';

@registry([
  {
    token: tokens.USER_MODEL,
    useFactory: instanceCachingFactory((_) => {
      return User;
    }),
  },
  {
    token: tokens.USER_SERVICE,
    useClass: UserService,
  },
  {
    token: tokens.NOTE_MODEL,
    useFactory: instanceCachingFactory((_) => {
      return Note;
    }),
  },
  {
    token: tokens.NOTE_SERVICE,
    useClass: NotesService,
  },
  {
    token: tokens.EMAIL_PROVIDER,
    useFactory: instanceCachingFactory((_) => {
      return sgMail;
    }),
  },
  {
    token: tokens.EMAIL_SERVICE,
    useClass: EmailService,
  },
  {
    token: tokens.FOCUSTIME_MODEL,
    useFactory: instanceCachingFactory((_) => {
      return FocusTime;
    }),
  },
  {
    token: tokens.FOCUSTIME_SERVICE,
    useClass: FocusTimeService,
  },
  {
    token: tokens.GOAL_MODEL,
    useFactory: instanceCachingFactory((_) => {
      return Goal;
    }),
  },
  {
    token: tokens.REMINDER_SERVICE,
    useClass: ReminderService,
  },
  {
    token: tokens.REMINDER_MODEL,
    useFactory: instanceCachingFactory((_) => {
      return Reminder;
    }),
  },
])
class myRegistry {}
