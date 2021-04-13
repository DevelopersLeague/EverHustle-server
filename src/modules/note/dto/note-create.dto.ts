import { IUser } from '../../user';
import { Joi } from 'celebrate';

export class NoteCreateDto {
  constructor(
    public user: IUser,
    public title: string,
    public content: string,
    public category: string
  ) {}

  public static validationSchema = Joi.object({
    title: Joi.string().alphanum().required(),
    content: Joi.string().alphanum().required(),
    category: Joi.string().alphanum().required(),
  });
}
