export class ReminderRespDto {
  public id: string;
  public title: string;
  public content: string;
  public category: string;
  public timeStamp: string;
  public createdAt: string;
  public updatedAt: string;

  private constructor(
    id: string,
    title: string,
    content: string,
    category: string,
    timeStamp: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.timeStamp = timeStamp;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static create({
    id,
    title,
    content,
    category,
    timeStamp,
    createdAt,
    updatedAt,
  }: {
    id: string;
    title: string;
    content: string;
    category: string;
    timeStamp: string;
    createdAt: string;
    updatedAt: string;
  }): ReminderRespDto {
    return new ReminderRespDto(
      id,
      title,
      content,
      category,
      timeStamp,
      createdAt,
      updatedAt
    );
  }
}
