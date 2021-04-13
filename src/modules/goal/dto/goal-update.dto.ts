import { IUser } from '../../user';
import { Joi } from 'celebrate';

export class GoalUpdateDto {
  constructor(
    public id: string,
    public title?: string,
    public content?: string,
    public category?: string,
    public isCompleted?: boolean
  ) {}

  public static validationSchema = Joi.object({
    title: Joi.string().alphanum(),
    content: Joi.string().alphanum(),
    category: Joi.string().alphanum(),
    isCompleted: Joi.boolean(),
  });
}
