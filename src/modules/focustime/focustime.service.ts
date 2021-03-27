import { inject, injectable, singleton } from 'tsyringe';
import { tokens } from '../../config/tokens.config';
import { UserService, IUser } from '../user';
import { FocusTimeCreateDto } from './dto/focustime-create.dto';
import { IFocusTime } from './focustime.model';
import { Model } from 'mongoose';
import { logger } from '../../common';

@injectable()
@singleton()
export class FocusTimeService {
  constructor(
    @inject(tokens.USER_SERVICE)
    private readonly userService: UserService,
    @inject(tokens.FOCUSTIME_MODEL)
    private readonly FocusTime: Model<IFocusTime>
  ) {}

  /**
   * @description
   * creates a new focusTime
   */
  public async createFocusTime(dto: FocusTimeCreateDto): Promise<IFocusTime> {
    const focusTime = new this.FocusTime();
    focusTime.hr = dto.hr;
    focusTime.min = dto.min;
    focusTime.sec = dto.sec;
    const user = await this.userService.findUserByid(dto.user.id);
    focusTime.user = user;
    focusTime.date = dto.date;
    await user.populate('focustimes').execPopulate();
    user.focusTimes.push(focusTime);
    await user.save();
    await focusTime.save();
    return Promise.resolve(focusTime);
  }

  /**
   * @description
   * returns list of all focusTimes of a certain date
   */
  public async getAllFocusTimeofDate(
    date: Date,
    user: IUser
  ): Promise<IFocusTime[]> {
    const times = await this.FocusTime.find().where({
      date: date,
      isDeleted: false,
      user: user._id,
    });
    return Promise.resolve(times);
  }
}
