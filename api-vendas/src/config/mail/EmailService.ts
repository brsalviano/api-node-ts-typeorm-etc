import nodemailer from 'nodemailer';
import account from './account'; //se estiver usando o repositório do git, crie a partir do arquivo account-example.ts

interface ISendMail {
    to: string;
    body: string;
}

export default class EmailService {
    static async sendMail({ to, body }: ISendMail): Promise<void> {
        const transporter = nodemailer.createTransport(account.credentials);

        const message = await transporter.sendMail({
            from: 'equipe@apivendas.com.br',
            to,
            subject: 'Recuperação de Senha',
            text: body,
        });

        console.log('Message sent!');
        console.log(message);
    }
}
