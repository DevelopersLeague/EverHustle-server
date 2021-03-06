import { Router, Request, Response, Handler } from 'express';
import { injectable, singleton, inject } from 'tsyringe';
import { catchAsync, IBaseController, logger } from '../../common';
import { UserMapper, UserService } from '../user';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.config';
import { AuthMiddleware } from './auth.middleware';
import { tokens } from '../../config/tokens.config';
import { CreateUserDto, UserLoginDto } from '../user/dto';
import { celebrate } from 'celebrate';

@injectable()
@singleton()
export class AuthController implements IBaseController {
  public path = '/api/v1/auth';
  public router = Router();
  public middlewareBefore: Handler[] = [];
  public middlewareAfter: Handler[] = [];

  constructor(
    @inject(tokens.USER_SERVICE) private readonly userService: UserService,
    private readonly userMapper: UserMapper,
    private readonly authMiddleware: AuthMiddleware
  ) {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      '/signup',
      celebrate({ body: CreateUserDto.validationSchema }),
      catchAsync(this.signup.bind(this))
    );
    this.router.post('/login', catchAsync(this.login.bind(this)));
    this.router.get(
      '/test',
      celebrate({ body: UserLoginDto.validationSchema }),
      this.authMiddleware.ensureAuth,
      catchAsync(this.test.bind(this))
    );
    this.router.get(
      '/confirmemail/:token',
      catchAsync(this.confirmEmail.bind(this))
    );
  }

  /**
   * POST /api/v1/auth/signup
   */
  public async signup(req: Request, res: Response): Promise<any> {
    const user = await this.userService.createUser(
      this.userMapper.anyToCreateDto(req.body)
    );
    res.status(201).json({
      user: this.userMapper.modelToRespDto(user),
      message: 'signup successful confirm email and login to continue',
    });
    //logger.debug('response sent');
  }

  /**
   * GET /api/v1/auth/confirmemail/:token
   */
  public async confirmEmail(req: Request, res: Response): Promise<void> {
    const token = req.params['token'];
    const payload: any = jwt.verify(token, env.JWT_SECRET_KEY);
    await this.userService.markEmailConfirmed(payload.id);
    res.redirect(env.CLIENT_URL);
  }

  /**
   * POST /api/v1/auth/login
   */
  public async login(req: Request, res: Response): Promise<void> {
    const token = await this.userService.login(
      this.userMapper.anyToLoginDto(req.body)
    );
    res.status(200).json({ token: `Bearer ${token}` });
  }

  /**
   * GET /api/v1/auth/test
   */
  public async test(req: Request, res: Response): Promise<void> {
    res.status(200).json({ test: 'test message' });
  }
}
