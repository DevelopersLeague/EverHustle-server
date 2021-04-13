import { Joi } from 'celebrate';
export class ReminderCreateDto {
  public userId: string;
  public title: string;
  public content: string;
  public category: string;
  public timestamp: Date;

  private constructor(
    userId: string,
    title: string,
    content: string,
    category: string,
    timestamp: Date
  ) {
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.category = category;
    this.timestamp = timestamp;
  }

  public static create({
    userId,
    title,
    content,
    category,
    timestamp,
  }: {
    userId: string;
    title: string;
    content: string;
    category: string;
    timestamp: Date;
  }): ReminderCreateDto {
    return new ReminderCreateDto(userId, title, content, category, timestamp);
  }

  public static validationSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    category: Joi.string().required(),
    timestamp: Joi.string().isoDate().required(),
  });
}
