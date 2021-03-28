export class NoteResponseDto {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public category: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
