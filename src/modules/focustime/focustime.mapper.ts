import { string } from 'joi';
import { logger } from '../../common';
import { IUser } from '../user';
import { FocusTimeCreateDto } from './dto/focustime-create.dto';
import { IFocusTime } from './focustime.model';

export class FocusTimeMapper {
  public timeStringToCreateDto(
    timeString: string,
    user: IUser,
    dateString: Date
  ): FocusTimeCreateDto {
    const dto = new FocusTimeCreateDto(
      Number(timeString.split(':')[0]),
      Number(timeString.split(':')[1]),
      Number(timeString.split(':')[2]),
      new Date(dateString),
      user
    );
    return dto;
  }

  public modelListToTimeString(times: IFocusTime[]): string {
    let min: number, sec: number, hr: number;
    min = 0;
    sec = 0;
    hr = 0;
    times.forEach((time) => {
      sec = sec + time.sec;
      min = sec + time.min;
      hr = sec + time.hr;
    });
    min += Math.floor(sec / 60);
    sec = sec % 60;
    hr += Math.floor(min / 60);
    min = min % 60;
    const timeString =
      hr.toString() + ':' + min.toString() + ':' + sec.toString();
    logger.debug('timeString: %o', timeString);
    return timeString;
  }
}
