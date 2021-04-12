export class ReminderRespDto {
  public id: string;
  public title: string;
  public content: string;
  public category: string;
  public timestamp: string;
  public createdAt: string;
  public updatedAt: string;
  public isActive: boolean;

  private constructor(
    id: string,
    title: string,
    content: string,
    category: string,
    timestamp: string,
    createdAt: string,
    updatedAt: string,
    isActive: boolean
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.timestamp = timestamp;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isActive = isActive;
  }

  public static create({
    id,
    title,
    content,
    category,
    timestamp,
    createdAt,
    updatedAt,
    isActive,
  }: {
    id: string;
    title: string;
    content: string;
    category: string;
    timestamp: string;
    createdAt: string;
    updatedAt: string;
    isActive: boolean;
  }): ReminderRespDto {
    return new ReminderRespDto(
      id,
      title,
      content,
      category,
      timestamp,
      createdAt,
      updatedAt,
      isActive
    );
  }
}
