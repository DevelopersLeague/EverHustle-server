export class ReminderRespDto {
  public id: string;
  public title: string;
  public content: string;
  public category: string;
  public timeStamp: Date;

  private constructor(
    id: string,
    title: string,
    content: string,
    category: string,
    timeStamp: Date
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.timeStamp = timeStamp;
  }

  public static create({
    id,
    title,
    content,
    category,
    timeStamp,
  }: {
    id: string;
    title: string;
    content: string;
    category: string;
    timeStamp: Date;
  }): ReminderRespDto {
    return new ReminderRespDto(id, title, content, category, timeStamp);
  }
}
