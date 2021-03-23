import { string } from 'joi';
import { logger } from '../../common';
import { IUser } from '../user';
import { FocusTimeCreateDto } from './dto/focustime-create.dto';
import { IFocusTime } from './focustime.model';

export class FocusTimeMapper {
  public timeStringToCreateDto(
    timeString: string,
    dateString: string,
    user: IUser
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
      min = min + time.min;
      hr = hr + time.hr;
    });
    min += Math.floor(sec / 60);
    sec = sec % 60;
    hr += Math.floor(min / 60);
    min = min % 60;
    const timeString =
      hr.toString() + ':' + min.toString() + ':' + sec.toString();
    logger.debug('mapper: timeString: %o', timeString);
    return timeString;
  }

  public modelToTimeString(focusTime: IFocusTime): string {
    const timeString =
      focusTime.hr.toString() +
      ':' +
      focusTime.min.toString() +
      ':' +
      focusTime.sec.toString();
    // logger.debug('timeString: %o', timeString);
    return timeString;
  }
}
