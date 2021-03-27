import { IUser } from '../../user';

export class GoalUpdateDto {
  constructor(
    public id: string,
    public title?: string,
    public content?: string,
    public category?: string,
    public isCompleted?: boolean
  ) {}
}
