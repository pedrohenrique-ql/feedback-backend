import { MailProvider, SendMailData } from "../MailProvider";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "c234e4635951ba",
    pass: "1554edf1c5bef6"
  }
});

export class NodemailerProvider implements MailProvider {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <equipef@feedget.com>',
      to: 'Pedro Henrique <pedronexy88@gmail.com',
      subject,
      html: body,
    });
  };
}
