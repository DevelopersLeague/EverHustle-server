import { IUser } from '../../user';

export class NoteCreateDto {
  constructor(
    public user: IUser,
    public title: string,
    public content: string,
    public category: string
  ) {}
}
