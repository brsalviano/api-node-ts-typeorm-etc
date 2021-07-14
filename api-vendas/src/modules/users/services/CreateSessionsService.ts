import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken'; //para gerar o token
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionsService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const usersRepository = getCustomRepository(UsersRepository);
        //Pego o usuário pelo email
        const user = await usersRepository.findByEmail(email);

        //Se não existir, envio a mensagem de erro
        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        //Comparo a senha
        const passwordConfirmed = await compare(password, user.password);

        //Se a senha estiver errada, devolvo um erro
        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        //Gero o token
        const token = sign({}, 'secret', {
            subject: user.id,
            expiresIn: '1d',
        });

        //Devolvo o usuário e o token gerado
        return { user, token };
    }
}

export default CreateSessionsService;
