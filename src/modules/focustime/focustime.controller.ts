import { Router, Request, Response, Handler } from 'express';
import { injectable, singleton, inject } from 'tsyringe';
import { catchAsync, IBaseController, logger } from '../../common';
import { UserMapper, UserService } from '../user';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.config';
import { AuthMiddleware } from '../auth/auth.middleware';
import { tokens } from '../../config/tokens.config';
import { FocusTimeService } from './focustime.service';
import { FocusTimeMapper } from './focustime.mapper';
import { celebrate, Joi } from 'celebrate';

@injectable()
@singleton()
export class FocusTimeController implements IBaseController {
  public path = '/api/v1/focustime';
  public router = Router();
  public middlewareBefore: Handler[] = [];
  public middlewareAfter: Handler[] = [];

  constructor(
    @inject(tokens.FOCUSTIME_SERVICE)
    private readonly focusTimeService: FocusTimeService,
    private readonly focusTimeMapper: FocusTimeMapper,
    private readonly authMiddleware: AuthMiddleware
  ) {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(
      '/:dateString',
      this.authMiddleware.ensureAuth,
      catchAsync(this.getFocusTime.bind(this))
    );
    this.router.post(
      '/',
      celebrate({
        body: Joi.object({
          date: Joi.string().isoDate(),
          time: Joi.string().regex(
            new RegExp('[0-9][0-9]:[0-9][0-9]:[0-9][0-9]')
          ),
        }),
      }),
      this.authMiddleware.ensureAuth,
      catchAsync(this.createFocusTime.bind(this))
    );
  }

  /**
   * @url
   * GET /api/v1/focustime/{date}
   * @discription
   * returns the total focusTime for a given date
   */
  public async getFocusTime(req: Request, res: Response): Promise<any> {
    const date = new Date(req.params['dateString']);
    const timeString = this.focusTimeMapper.modelListToTimeString(
      await this.focusTimeService.getAllFocusTimeofDate(date, req.user!)
    );
    res.json({ date: date.toISOString().split('T')[0], time: timeString });
  }

  /**
   * @url
   * POST /api/v1/focustime
   * @discription
   * add a new focusTime record
   */
  public async createFocusTime(req: Request, res: Response): Promise<any> {
    const timeString = req.body.time;
    const dateString = req.body.date;
    const focusTime = await this.focusTimeService.createFocusTime(
      this.focusTimeMapper.timeStringToCreateDto(
        timeString,
        dateString,
        req.user!
      )
    );
    res.json({
      time: this.focusTimeMapper.modelToTimeString(focusTime),
      date: new Date(dateString).toISOString().split('T')[0],
    });
  }
}
