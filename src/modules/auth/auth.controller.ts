import { Router, Request, Response } from 'express';
import { injectable, singleton } from 'tsyringe';
import { catchAsync, IBaseController, logger } from '../../common';
import { EmailService } from '../email';
import { UserMapper, UserService } from '../user';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.config';

@injectable()
@singleton()
export class AuthController implements IBaseController {
  public path = '/api/v1/auth';
  public router = Router();
  public middlewareBefore = [];
  public middlewareAfter = [];
  constructor(
    private readonly userService: UserService,
    private readonly userMapper: UserMapper
  ) {
    this.initRoutes();
  }
  public initRoutes(): void {
    this.router.post('/signup', catchAsync(this.signup.bind(this)));
    this.router.get(
      '/confirmemail/:token',
      catchAsync(this.confirmEmail.bind(this))
    );
  }

  /**
   * POST /api/v1/auth/signup
   */
  public async signup(req: Request, res: Response): Promise<void> {
    const user = await this.userService.createUser(
      this.userMapper.anyToCreateDto(req.body)
    );
    res.status(201).json({
      user: this.userMapper.modelToRespDto(user),
      message: 'signup successful confirm email and login to continue',
    });
  }

  /**
   * GET /api/v1/auth/confirmemail
   */
  public async confirmEmail(req: Request, res: Response): Promise<void> {
    const token = req.params['token'];
    const payload: any = jwt.verify(token, env.JWT_SECRET_KEY);
    await this.userService.markEmailConfirmed(payload.id);
    res.redirect('https://www.google.com/');
  }
}
