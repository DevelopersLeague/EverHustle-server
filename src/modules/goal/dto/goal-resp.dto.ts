import { IUser } from '../../user';

export class GoalRespDto {
  constructor(
    public id: string,
    public title: string,
    public content: string,
    public category: string,
    public isCompleted: boolean,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
}
