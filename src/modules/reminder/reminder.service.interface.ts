import { Reminder, IReminder } from './reminder.model';
import { ReminderCreateDto, ReminderRespDto, ReminderUpdateDto } from './dto';

export interface IReminderService {
  createReminder: (dto: ReminderCreateDto) => Promise<IReminder>;
  getReminderByID: (id: string) => Promise<IReminder>;
  getAllReminders: (userId: string) => Promise<IReminder[]>;
  updateReminder: (dto: ReminderUpdateDto) => Promise<IReminder>;
  deleteReminder: (id: string) => Promise<IReminder>;
  respondActiveReminders: () => Promise<void>;
}
