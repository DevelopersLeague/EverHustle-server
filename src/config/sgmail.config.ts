import sgMail from '@sendgrid/mail';
import { env } from './env.config';
sgMail.setApiKey(env.SENDGRID_API_KEY);
export { sgMail };
