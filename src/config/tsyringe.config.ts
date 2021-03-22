import { Model } from 'mongoose';
import { registry, instanceCachingFactory } from 'tsyringe';
import { IUser, User, UserService } from '../modules/user';
import { tokens } from './tokens.config';

@registry([
  {
    token: tokens.USER_MODEL,
    useFactory: instanceCachingFactory<Model<IUser>>((_) => {
      return User;
    }),
  },
  {
    token: tokens.USER_SERVICE,
    useClass: UserService,
  },
])
class myRegistry {}
