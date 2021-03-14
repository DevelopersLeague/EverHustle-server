import { injectable, singleton } from 'tsyringe';
import { CreateUserDto } from './dto';
import bcrypt from 'bcrypt';
import { IUser, User } from './user.model';
import { env } from '../../config/env.config';

@injectable()
@singleton()
export class UserService {
  public models = { User: User };
  public async createUser(dto: CreateUserDto): Promise<IUser> {
    const user = new this.models.User();
    user.firstName = dto.firstName;
    user.lastName = dto.lastName;
    user.email = dto.email;
    user.password = await bcrypt.hash(dto.password, env.SALT_ROUNDS);
    await user.save();
    return Promise.resolve(user);
  }
}
