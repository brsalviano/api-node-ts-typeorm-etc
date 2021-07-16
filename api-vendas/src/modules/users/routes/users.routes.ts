import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const usersController = new UsersController();

//Importando o novo controller que vamos usar
const usersAvatarController = new UserAvatarController();
const upload = multer(uploadConfig); //Middleware para o multer

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

//Rota para o upload do avatar
usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'), //usando o middleware do multer
    usersAvatarController.update,
);

export default usersRouter;
