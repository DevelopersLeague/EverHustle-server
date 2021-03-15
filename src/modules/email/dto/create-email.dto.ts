export class CreateEmailDto {
  constructor(
    public to: string,
    public from: string,
    public subject: string,
    public html: string
  ) {}
}
