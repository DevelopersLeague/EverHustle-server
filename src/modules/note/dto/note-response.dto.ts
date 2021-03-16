export class NoteResponseDto {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public category: string
  ) {}
}
