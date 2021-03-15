import { injectable, singleton } from 'tsyringe';
import { CreateUserDto } from './dto';
import bcrypt from 'bcrypt';
import { IUser, User } from './user.model';
import { env } from '../../config/env.config';
import createHttpError from 'http-errors';
import { EmailService } from '../email';

@injectable()
@singleton()
export class UserService {
  public models = { User: User };
  constructor(public emailService: EmailService) {}
  /**
   * @description
   * creates a new user
   */
  public async createUser(dto: CreateUserDto): Promise<IUser> {
    const existingUser = await this.models.User.findOne({ email: dto.email });
    if (existingUser) {
      throw new createHttpError.BadRequest('email already taken');
    }
    const user = new this.models.User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.password = await bcrypt.hash(dto.password, env.SALT_ROUNDS);
    await user.save();
    await this.emailService.sendVerificationEmail(user.id, user.email);
    return Promise.resolve(user);
  }

  /**
   * @description
   * marks the email as confirmed
   */
  public async markEmailConfirmed(id: string): Promise<void> {
    const user = await this.models.User.findById(id);
    if (user) {
      user.isEmailVerified = true;
      await user.save();
    }
  }
}
