import { injectable, singleton } from 'tsyringe';
import { IUser } from '../user';
import { ReminderCreateDto } from './dto/reminder-create.dto';
import { ReminderRespDto } from './dto/reminder-resp.dto';
import { ReminderUpdateDto } from './dto/reminder-update.dto';
import { IReminder } from './reminder.model';

@injectable()
@singleton()
export class ReminderMapper {
  public anyToCreateDto(body: any, user: IUser): ReminderCreateDto {
    return ReminderCreateDto.create({
      userId: user.id,
      title: body.title,
      content: body.content,
      category: body.category,
      timeStamp: new Date(body.timeStamp),
    });
  }

  public modelToRespDto(reminder: IReminder): ReminderRespDto {
    return ReminderRespDto.create({
      id: reminder.id,
      title: reminder.title,
      content: reminder.content,
      category: reminder.category,
      timeStamp: reminder.timeStamp.toISOString(),
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
      timeStamp: new Date(body.timeStamp),
    });
  }
}
