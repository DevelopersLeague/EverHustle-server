import { injectable, singleton } from 'tsyringe';
import { env } from '../../config/env.config';
import { EmailService, CreateEmailDto } from '../email';
import jwt from 'jsonwebtoken';
import { User, UserService } from '../user';

@injectable()
@singleton()
export class AuthService {
  public models = { User: User };
  constructor(public emailService: EmailService) {}
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
    const verficationLink = `${env.SERVER_URL}/auth/confirmemail/${token}`;
    await this.emailService.sendMail(
      new CreateEmailDto(
        userEmail,
        'everhustleapp@gmail.com',
        'test subject',
        `<a href="${verficationLink}">verify email</a>`
      )
    );
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
