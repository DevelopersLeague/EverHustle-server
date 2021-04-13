import { inject, injectable, singleton } from 'tsyringe';
import { tokens } from '../../config/tokens.config';
import { Model } from 'mongoose';
import { IReminder } from './reminder.model';
import { token } from 'morgan';
import { IReminderService } from './reminder.service.interface';
import { ReminderMapper } from './reminder.mapper';
import { catchAsync, IBaseController } from '../../common';
import { Router, Request, Response } from 'express';
import { ReminderCreateDto } from './dto';
import { AuthMiddleware } from '../auth';
import createHttpError from 'http-errors';
import * as dto from './dto';
import { celebrate } from 'celebrate';

@injectable()
@singleton()
export class ReminderController implements IBaseController {
  public path = '/api/v1/reminders';
  public router = Router();
  public middlewareAfter = [];
  public middlewareBefore = [];

  constructor(
    @inject(tokens.REMINDER_MODEL) private readonly Reminder: Model<IReminder>,
    @inject(tokens.REMINDER_SERVICE)
    private readonly reminderService: IReminderService,
    private readonly mapper: ReminderMapper,
    private readonly authMiddleware: AuthMiddleware
  ) {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(
      '/',
      celebrate({ body: dto.ReminderCreateDto.validationSchema }),
      this.authMiddleware.ensureAuth,
      catchAsync(this.createOneReminder.bind(this))
    );
    this.router.get(
      '/',
      this.authMiddleware.ensureAuth,
      catchAsync(this.getAllReminders.bind(this))
    );
    this.router.get(
      '/:id',
      this.authMiddleware.ensureAuth,
      catchAsync(this.getOneReminder.bind(this))
    );
    this.router.put(
      '/:id',
      this.authMiddleware.ensureAuth,
      celebrate({ body: dto.ReminderUpdateDto.validationSchema }),
      catchAsync(this.updateOneReminder.bind(this))
    );
    this.router.delete(
      '/:id',
      this.authMiddleware.ensureAuth,
      catchAsync(this.deleteOneReminder.bind(this))
    );
  }

  /**
   * @url
   * POST /api/v1/reminders
   * @description
   * creates a new reminder
   */
  public async createOneReminder(req: Request, res: Response): Promise<any> {
    const reminder = await this.reminderService.createReminder(
      this.mapper.anyToCreateDto(req.body, req.user!)
    );
    res.json({
      message: 'reminder created',
      reminder: this.mapper.modelToRespDto(reminder),
    });
  }

  /**
   * @url
   * GET /api/v1/reminders
   * @description
   * gets all the reminders of the user
   */
  public async getAllReminders(req: Request, res: Response): Promise<any> {
    let reminders = await this.reminderService.getAllReminders(req.user!.id);
    if (req.params.category) {
      reminders = reminders.filter((reminder) => {
        if (reminder.category === req.params.category) return true;
      });
    }
    if (req.params.date) {
      reminders = reminders.filter((reminder) => {
        if (reminder.timestamp.toISOString().split('T')[0] === req.params.date)
          return true;
      });
    }
    const respReminders = reminders.map((reminder) => {
      return this.mapper.modelToRespDto(reminder);
    });
    res.json({ reminders: respReminders });
  }

  /**
   * @url
   * GET /api/v1/reminders/{id}
   * @description
   * get reminder by id
   */
  public async getOneReminder(req: Request, res: Response): Promise<any> {
    const reminder = await this.reminderService.getReminderByID(req.params.id);
    await reminder.populate('user').execPopulate();
    if (reminder.user.id != req.user!.id) {
      throw new createHttpError.Unauthorized(
        'not authorized to acess reminder'
      );
    }
    return res.json({ reminder: this.mapper.modelToRespDto(reminder) });
  }

  /**
   * @url
   * PUT /api/v1/reminders/{id}
   * @description
   * update a reminder
   */
  public async updateOneReminder(req: Request, res: Response): Promise<any> {
    let reminder = await this.reminderService.getReminderByID(req.params.id);
    await reminder.populate('user').execPopulate();
    if (reminder.user.id != req.user!.id) {
      throw new createHttpError.Unauthorized(
        'not authorized to access reminder'
      );
    }
    reminder = await this.reminderService.updateReminder(
      this.mapper.anyToUpdateDto(req.body, req.params.id)
    );
    res.json({
      message: 'reminder updated',
      reminder: this.mapper.modelToRespDto(reminder),
    });
  }

  /**
   * @url
   * DELETE /api/v1/reminders/{id}
   * @description
   * delete a reminder
   */
  public async deleteOneReminder(req: Request, res: Response): Promise<any> {
    let reminder = await this.reminderService.getReminderByID(req.params.id);
    await reminder.populate('user').execPopulate();
    if (reminder.user.id != req.user!.id) {
      throw new createHttpError.Unauthorized(
        'not authorized to access reminder'
      );
    }
    reminder = await this.reminderService.deleteReminder(reminder.id);
    res.json({
      message: 'reminder deleted',
      reminder: this.mapper.modelToRespDto(reminder),
    });
  }
}
