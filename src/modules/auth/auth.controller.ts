import { Router } from 'express';
import { injectable, singleton } from 'tsyringe';
import { IBaseController } from '../../common';
import { UserService } from '../user';

@injectable()
@singleton()
export class AuthController implements IBaseController {
  public path = '/api/v1/auth';
  public router = Router();
  public middlewareBefore = [];
  public middlewareAfter = [];
  constructor(private readonly userService: UserService) {
    this.initRoutes();
  }
  public initRoutes() {
    this.router.post('/register', this.register.bind(this));
  }

  /**
   * POST /api/v1/auth/register
   */
  public async register(): Promise<void> {}
}
