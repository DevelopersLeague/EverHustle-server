export class ReminderCreateDto {
  public userId: string;
  public title: string;
  public content: string;
  public category: string;
  public timeStamp: Date;

  private constructor(
    userId: string,
    title: string,
    content: string,
    category: string,
    timeStamp: Date
  ) {
    this.userId = userId;
    this.title = title;
    this.content = content;
    this.category = category;
    this.timeStamp = timeStamp;
  }

  public static create({
    userId,
    title,
    content,
    category,
    timeStamp,
  }: {
    userId: string;
    title: string;
    content: string;
    category: string;
    timeStamp: Date;
  }): ReminderCreateDto {
    return new ReminderCreateDto(userId, title, content, category, timeStamp);
  }
}
