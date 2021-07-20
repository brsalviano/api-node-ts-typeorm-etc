import nodemailer from 'nodemailer';
import account from './account'; //se estiver usando o repositório do git, crie a partir do arquivo account-example.ts
import {
    IParseMailTemplate,
    HandlebarsMailTemplate,
} from './HandlebarsMailTemplate';

interface IMailContact {
    name: string;
    email: string;
}

interface ISendMail {
    to: IMailContact;
    from?: IMailContact;
    subject: string;
    templateData: IParseMailTemplate;
}

export default class EmailService {
    static async sendMail({
        to,
        from,
        subject,
        templateData,
    }: ISendMail): Promise<void> {
        const transporter = nodemailer.createTransport(account.credentials);

        const message = await transporter.sendMail({
            from: {
                name: from?.name || 'Equipe API Vendas',
                address: from?.email || 'equipe@apivendas.com.br',
            },
            to: {
                name: to.name,
                address: to.email,
            },
            subject,
            html: await new HandlebarsMailTemplate().parse(templateData),
        });

        console.log('Message sent!');
        console.log(message);
    }
}
