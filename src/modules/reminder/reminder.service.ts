import { inject } from 'tsyringe';
import { tokens } from '../../config/tokens.config';
import { Model } from 'mongoose';
import { IReminder } from './reminder.model';
import { IReminderService } from './reminder.service.interface';
import { UserService } from '../user';
import { ReminderCreateDto, ReminderUpdateDto } from './dto';
import createHttpError from 'http-errors';
import { create } from 'node:domain';
import { EmailService } from '../email';
import { logger } from '../../common';

export class ReminderService implements IReminderService {
  constructor(
    @inject(tokens.REMINDER_MODEL) private readonly Reminder: Model<IReminder>,
    @inject(tokens.USER_SERVICE) private readonly userService: UserService,
    @inject(tokens.EMAIL_SERVICE) private readonly emailService: EmailService
  ) {}

  /**
   * @description
   * creates a new Reminder
   */
  public async createReminder(dto: ReminderCreateDto): Promise<IReminder> {
    const reminder = new this.Reminder();
    const user = await this.userService.findUserByid(dto.userId);
    await user.populate('reminders').execPopulate();
    reminder.title = dto.title;
    reminder.content = dto.content;
    reminder.category = dto.category;
    reminder.timeStamp = dto.timeStamp;
    reminder.user = user;
    await reminder.save();
    user.reminders.push(reminder);
    await user.save();
    return reminder;
  }

  /**
   * @description
   * get one reminder by id
   */
  public async getReminderByID(id: string): Promise<IReminder> {
    const reminder = await this.Reminder.findById(id).where({
      isDeleted: false,
    });
    if (reminder) {
      return reminder;
    }
    throw new createHttpError.BadRequest('invalid reminder id');
  }

  /**
   * @description
   * get all the reminders of a user
   */
  public async getAllReminders(userId: string): Promise<IReminder[]> {
    const user = await this.userService.findUserByid(userId);
    const reminders = await this.Reminder.find({
      user: user._id,
      isDeleted: false,
    });
    return reminders;
  }

  /**
   * @description
   * update a reminder
   */
  public async updateReminder(dto: ReminderUpdateDto): Promise<IReminder> {
    const reminder = await this.Reminder.findById(dto.id);
    if (reminder) {
      reminder.title = dto.title ? dto.title : reminder?.title;
      reminder.category = dto.category ? dto.category : reminder?.category;
      reminder.content = dto.content ? dto.content : reminder?.content;
      reminder.timeStamp = dto.timeStamp ? dto.timeStamp : reminder?.timeStamp;
      await reminder.save();
      return reminder;
    }
    throw new createHttpError.BadRequest('invalid reminder id');
  }

  /**
   * @description
   * delete a reminder
   */
  public async deleteReminder(id: string): Promise<IReminder> {
    const reminder = await this.getReminderByID(id);
    reminder.isDeleted = true;
    await reminder.save();
    return reminder;
  }

  /**
   * @description
   * sends email to all the active reminders
   */
  public async respondActiveReminders(): Promise<void> {
    const currentTime = new Date();
    const allReminders = await this.Reminder.find().where({ isDeleted: false });
    const activeReminders = allReminders.filter((reminder) => {
      return reminder.isActive == false && reminder.timeStamp <= currentTime;
    });
    logger.debug('active reminders: %o', activeReminders);
    for (const reminder of activeReminders) {
      logger.debug('single reminder: %o', reminder);
      await reminder.populate('user').execPopulate();
      await this.emailService.sendReminderEmail(reminder.user, reminder);
    }
  }
}
