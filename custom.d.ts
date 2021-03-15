import { IUser } from './src/modules/user';

// extending the express request object
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
