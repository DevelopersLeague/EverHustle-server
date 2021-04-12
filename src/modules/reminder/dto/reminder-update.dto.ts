export class ReminderUpdateDto {
  public id: string;
  public title?: string;
  public content?: string;
  public category?: string;
  public timestamp?: Date;

  private constructor(
    id: string,
    title: string | undefined,
    content: string | undefined,
    category: string | undefined,
    timestamp: Date | undefined
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.category = category;
    this.timestamp = timestamp;
  }

  public static create({
    id,
    title,
    content,
    category,
    timestamp,
  }: {
    id: string;
    title?: string;
    content?: string;
    category?: string;
    timestamp?: Date;
  }): ReminderUpdateDto {
    return new ReminderUpdateDto(id, title, content, category, timestamp);
  }
}
