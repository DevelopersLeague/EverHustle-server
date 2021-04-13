import { Joi } from 'celebrate';

export class CreateUserDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string
  ) {}

  public static validationSchema = Joi.object({
    firstName: Joi.string().alphanum().required(),
    lastName: Joi.string().alphanum().required(),
    email: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required(),
  });
}
