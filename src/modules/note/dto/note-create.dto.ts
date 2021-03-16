export class NoteCreateDto {
  constructor(
    public title: string,
    public content: string,
    public category: string
  ) {}
}
