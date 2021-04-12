import { injectable, singleton } from 'tsyringe';
import { logger } from '../../common';
import { IUser } from '../user';
import { ReminderCreateDto } from './dto/reminder-create.dto';
import { ReminderRespDto } from './dto/reminder-resp.dto';
import { ReminderUpdateDto } from './dto/reminder-update.dto';
import { IReminder } from './reminder.model';

@injectable()
@singleton()
export class ReminderMapper {
  public anyToCreateDto(body: any, user: IUser): ReminderCreateDto {
    const dto = ReminderCreateDto.create({
      userId: user.id,
      title: body.title,
      content: body.content,
      category: body.category,
      timestamp: new Date(body.timestamp),
    });
    // logger.debug(dto.timestamp);
    // logger.debug(body.timestamp);
    return dto;
  }

  public modelToRespDto(reminder: IReminder): ReminderRespDto {
    return ReminderRespDto.create({
      id: reminder.id,
      title: reminder.title,
      content: reminder.content,
      category: reminder.category,
      timestamp: reminder.timestamp.toISOString(),
      createdAt: reminder.createdAt.toISOString(),
      updatedAt: reminder.updatedAt.toISOString(),
      isActive: reminder.isActive,
    });
  }

  public anyToUpdateDto(body: any, id: string): ReminderUpdateDto {
    return ReminderUpdateDto.create({
      id: id,
      title: body.title,
      content: body.content,
      category: body.category,
      timestamp: body.timestamp ? new Date(body.timestamp) : undefined,
    });
  }
}
