import { CreateUserDto, UserResponseDto } from './dto';
import { IUser } from './user.model';
export class UserMapper {
  public static anyToCreateDto(body: any): CreateUserDto {
    const dto = new CreateUserDto(
      body.firstName,
      body.lastName,
      body.email,
      body.password
    );
    return dto;
  }

  public modelToRespDto(user: IUser): UserResponseDto {
    const respDto = new UserResponseDto(
      user.firstName,
      user.lastName,
      user.email
    );
    return respDto;
  }
}
