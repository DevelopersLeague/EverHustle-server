import { UserMapper } from '../user.mapper';
import { IUser } from '../user.model';

describe('UserMapper', () => {
  describe('UserMapper.anyToCreateDto', () => {
    test('it should return createUserDto with correct values', () => {
      const mapper = new UserMapper();
      const createUserDto = mapper.anyToCreateDto({
        firstName: 'john',
        lastName: 'dove',
        email: 'johndove@gmail.com',
        password: 'password123',
      });
      expect(createUserDto).toEqual({
        firstName: 'john',
        lastName: 'dove',
        email: 'johndove@gmail.com',
        password: 'password123',
      });
    });
  });

  describe('UserMapper.modelToRespDto', () => {
    test('should return correct instance of UserRespDto given necessary fields', () => {
      const mapper = new UserMapper();
      const respDto = mapper.modelToRespDto({
        id: 'abcd',
        firstName: 'john',
        lastName: 'dove',
        email: 'johndove@gmail.com',
        password: 'password123',
      } as IUser);
      expect(respDto).toHaveProperty('id');
      expect(respDto).toHaveProperty('email');
      expect(respDto).toHaveProperty('firstName');
      expect(respDto).toHaveProperty('lastName');
      expect(respDto).not.toHaveProperty('password');
    });
  });
  describe('UserMapper.anyToLoginDto', () => {
    test('should return correct instance of loginDto from any object', () => {
      const mapper = new UserMapper();
      const dto = mapper.anyToLoginDto({
        email: 'testemail@gmail.com',
        password: 'testpassword',
        extra: 'extra information',
      });
      expect(dto).toEqual({
        email: 'testemail@gmail.com',
        password: 'testpassword',
      });
      expect(dto).not.toHaveProperty('extra');
    });
  });
});
