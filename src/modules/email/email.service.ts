import { injectable, singleton } from 'tsyringe';
import { sgMail } from '../../config/sgmail.config';
import { CreateEmailDto } from './dto';

@injectable()
@singleton()
export class EmailService {
  public sgMail = sgMail;
  public async sendMail(dto: CreateEmailDto): Promise<void> {
    await sgMail.send({
      to: dto.to,
      from: dto.from,
      subject: dto.subject,
      html: dto.html,
    });
  }
}
