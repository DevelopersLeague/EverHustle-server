export class ReminderRespDto {
  public id: string;
  public title: string;
  public content: string;
  public category: string;
  public timeStamp: string;
  public createdAt: string;
  public updatedAt: string;
  public isActive: boolean;

  private constructor(
    id: string,
    title: string,
    content: string,
    category: string,
    timeStamp: string,
    createdAt: string,
    updatedAt: string,
    isActive: boolean
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.timeStamp = timeStamp;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isActive = isActive;
  }

  public static create({
    id,
    title,
    content,
    category,
    timeStamp,
    createdAt,
    updatedAt,
    isActive,
  }: {
    id: string;
    title: string;
    content: string;
    category: string;
    timeStamp: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  }): ReminderRespDto {
    return new ReminderRespDto(
      id,
      title,
      content,
      category,
      timeStamp,
      createdAt,
      updatedAt,
      isActive
    );
  }
}
