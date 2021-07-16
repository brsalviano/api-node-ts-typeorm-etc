import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);

        const user = await usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found.');
        }

        //Se já tiver avatar, vamos excluir o que já existe.
        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            //Primeiro verificamos se o arquivo existe...
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            //Se existir, excluímos
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;
        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
