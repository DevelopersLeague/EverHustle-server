import { inject, injectable, singleton } from 'tsyringe';
import { CreateUserDto } from './dto';
import bcrypt from 'bcrypt';
import { IUser } from './user.model';
import { env } from '../../config/env.config';
import createHttpError from 'http-errors';
import { EmailService } from '../email';
import { UserLoginDto } from './dto/user-login.dto';
import jwt from 'jsonwebtoken';
import { tokens } from '../../config/tokens.config';
import { Model } from 'mongoose';

@injectable()
@singleton()
export class UserService {
  // public models = { User: User };

  constructor(
    @inject(tokens.USER_MODEL) private readonly User: Model<IUser>,
    @inject(tokens.EMAIL_SERVICE) private readonly emailService: EmailService
  ) {}

  /**
   * @description
   * creates a new user
   */
  public async createUser(dto: CreateUserDto): Promise<IUser> {
    const existingUser = await this.User.findOne({ email: dto.email });
    if (existingUser) {
      return Promise.reject(
        new createHttpError.BadRequest('email already taken')
      );
    }
    const user = new this.User();
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
    const user = await this.User.findById(id);
    if (user) {
      user.isEmailVerified = true;
      await user.save();
    }
  }

  /**
   * @description
   * finds and returns the user with given id
   */
  public async findUserByid(id: string): Promise<IUser> {
    const user = await this.User.findById(id).where({
      isDeleted: false,
    });
    if (user) {
      return Promise.resolve(user);
    } else {
      return Promise.reject(new Error('invalid user id'));
    }
  }

  /**
   * @description
   * logs in the user\
   * returns signed jwt containing user data
   */
  public async login(dto: UserLoginDto): Promise<string> {
    const user = await this.User.findOne({ email: dto.email });
    if (!user) {
      return Promise.reject(new createHttpError.Unauthorized('invalid email'));
    } else {
      // if user is found
      // email not verified
      if (!user.isEmailVerified) {
        return Promise.reject(
          new createHttpError.Unauthorized('email not verified')
        );
      }
      // if passwords match
      if (await bcrypt.compare(dto.password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          env.JWT_SECRET_KEY,
          {
            expiresIn: '1d',
          }
        );
        return Promise.resolve(token);
      } else {
        // if passwords do not match
        return Promise.reject(
          new createHttpError.Unauthorized('invalid password')
        );
      }
    }
  }

  /**
   * @description
   * populates notes for the user
   */
  public async populateNotes(user: IUser): Promise<IUser> {
    const myUser = await this.User.findById(user.id)
      .where({
        isDeleted: false,
      })
      .populate('notes');
    if (myUser) {
      return Promise.resolve(myUser);
    } else {
      throw new Error('user not found');
    }
  }
}
