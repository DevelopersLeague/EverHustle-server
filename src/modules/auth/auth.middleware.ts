import { NextFunction, Request, Response } from 'express';
import { injectable, singleton } from 'tsyringe';
import { UserService } from '../user';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.config';
import createHttpError from 'http-errors';

@injectable()
@singleton()
export class AuthMiddleware {
  constructor(private readonly userService: UserService) {
    this.ensureAuth = this.ensureAuth.bind(this);
  }
  /**
   * @description
   * ensure that the authToken is valid and attach the user object to request object
   */
  public ensureAuth(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers['authorization']?.split(' ')[1];
    if (token) {
      try {
        const payload: any = jwt.verify(token, env.JWT_SECRET_KEY);
        this.userService
          .findUserByid(payload.id)
          .then((user) => {
            req.user = user;
            next();
          })
          .catch(next);
      } catch (err) {
        throw new createHttpError.Unauthorized('invalid token');
      }
    } else {
      next(new createHttpError.Unauthorized('Authorization token not found'));
    }
  }
}
