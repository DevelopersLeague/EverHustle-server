import { injectable, singleton } from 'tsyringe';
import { sgMail } from '../../config/sgmail.config';
import { CreateEmailDto } from './dto';
import jwt from 'jsonwebtoken';
import { env } from '../../config/env.config';

@injectable()
@singleton()
export class EmailService {
  public sgMail = sgMail;
  /**
   * @description
   * send an email
   */
  public async sendMail(dto: CreateEmailDto): Promise<void> {
    await sgMail.send({
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
    const token = jwt.sign({ id: userId }, env.JWT_SECRET_KEY);
    const verficationLink = `${env.SERVER_URL}/api/v1/auth/confirmemail/${token}`;
    await this.sendMail(
      new CreateEmailDto(
        userEmail,
        'everhustleapp@gmail.com',
        'test subject',
        `<a href="${verficationLink}">verify email</a>`
      )
    );
  }
}
