import { Joi } from 'celebrate';
export class NoteUpdateDto {
  constructor(
    public id: string,
    public title?: string,
    public content?: string,
    public category?: string
  ) {}

  public static validationSchema = Joi.object({
    title: Joi.string().alphanum(),
    content: Joi.string().alphanum(),
    category: Joi.string().alphanum(),
  });
}
