import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { isAfter, addHours } from 'date-fns';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import UserTokensRepository from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
    token: string;
    password: string;
}

class ResetPasswordService {
    public async execute({ token, password }: IRequest): Promise<void> {
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);

        const userToken = await userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User Token does not exists');
        }

        const user = await usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exists.');
        }

        const tokenCreatedAt = userToken.created_at;
        //O token tem validade de duas horas, então vamos somar duas horas da criação do token
        const compareDate = addHours(tokenCreatedAt, 2);

        //E verificar se já passou do tempo limite...
        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expired.');
        }

        //Se chegar aqui, vamos atualizar a senha...
        user.password = await hash(password, 8);

        //Não esqueça de salvar no banco.
        await usersRepository.save(user);
    }
}

export default ResetPasswordService;
