import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "ec0295af73fd68",
        pass: "8b73dea7b165a3"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({subject, body}: SendMailData) {
        transport.sendMail({
            from: 'Equipe Feedget <oi@feedget.com>',
            to: 'Dênerson Pinas <denersonpsouza@gmail.com>',
            subject: subject,
            html: body,
        })
    };
}