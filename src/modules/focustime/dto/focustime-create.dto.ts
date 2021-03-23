import { IUser } from '../../user';

export class FocusTimeCreateDto {
  constructor(
    public hr: number,
    public min: number,
    public sec: number,
    public date: Date,
    public user: IUser
  ) {}
}
