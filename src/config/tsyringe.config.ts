import { Model } from 'mongoose';
import { registry, instanceCachingFactory } from 'tsyringe';
import { IUser, User, UserService } from '../modules/user';
import { tokens } from './tokens.config';
import { sgMail } from './sgmail.config';

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
    token: tokens.EMAIL_PROVIDER,
    useFactory: instanceCachingFactory((_) => {
      return sgMail;
    }),
  },
])
class myRegistry {}
