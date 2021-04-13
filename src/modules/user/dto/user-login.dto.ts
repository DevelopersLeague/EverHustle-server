import { Joi } from 'celebrate';

export class UserLoginDto {
  constructor(public email: string, public password: string) {}

  public static validationSchema = Joi.object({
    email: Joi.string().alphanum().required(),
    password: Joi.string().alphanum().required(),
  });
}
