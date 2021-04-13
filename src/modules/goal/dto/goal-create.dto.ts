import { IUser } from '../../user';
import {Joi} from 'celebrate';

export class GoalCreateDto {
  constructor(
    public title: string,
    public content: string,
    public category: string,
    public user: IUser
  ) {}

  public static validationSchema = Joi.object({
    title: Joi.string().alphanum().required(),
    content: Joi.string().alphanum().required(),
    category: Joi.string().alphanum().required(),
  });
}
