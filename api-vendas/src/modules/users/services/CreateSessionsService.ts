import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs'; //Vamos usar a função de comparação do módulo bcryptjs
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
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

        //Devolvo o usuário
        return { user };
    }
}

export default CreateSessionsService;
