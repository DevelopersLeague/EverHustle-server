import { IUser } from '../../user';

export class GoalCreateDto {
  constructor(
    public title: string,
    public content: string,
    public category: string,
    public user: IUser
  ) {}
}
