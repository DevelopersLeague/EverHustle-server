export class CreateUserDto {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public password: string
  ) {}
}
