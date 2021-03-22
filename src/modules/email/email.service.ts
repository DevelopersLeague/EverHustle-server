import { injectable, singleton, inject } from 'tsyringe';
import { CreateEmailDto } from './dto';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.config';
import { tokens } from '../../config/tokens.config';
import { MailService } from '@sendgrid/mail';

@injectable()
@singleton()
export class EmailService {
  constructor(
    @inject(tokens.EMAIL_PROVIDER) private readonly sgMail: MailService
  ) {}
  /**
   * @description
   * send an email
   */
  public async sendMail(dto: CreateEmailDto): Promise<void> {
    await this.sgMail.send({
      to: dto.to,
      from: dto.from,
      subject: dto.subject,
      html: dto.html,
    });
  }

  /**
   * @description
   * sends the email for verification
   */
  public async sendVerificationEmail(
    userId: string,
    userEmail: string
  ): Promise<void> {
    // sending the email
    const token = jwt.sign({ id: userId }, env.JWT_SECRET_KEY, {
      expiresIn: '1d',
    });
    const verficationLink = `${env.SERVER_URL}/api/v1/auth/confirmemail/${token}`;
    await this.sendMail(
      new CreateEmailDto(
        userEmail,
        'everhustleapp@gmail.com',
        'confirm email',
        `<a href="${verficationLink}">verify email</a>`
      )
    );
  }
}
