export class ReminderUpdateDto {
  public id: string;
  public title?: string;
  public content?: string;
  public category?: string;
  public timeStamp?: Date;

  private constructor(
    id: string,
    title: string | undefined,
    content: string | undefined,
    category: string | undefined,
    timeStamp: Date | undefined
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
    title?: string;
    content?: string;
    category?: string;
    timeStamp?: Date;
  }): ReminderUpdateDto {
    return new ReminderUpdateDto(id, title, content, category, timeStamp);
  }
}
