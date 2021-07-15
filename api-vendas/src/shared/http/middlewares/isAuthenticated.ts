import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface TokenPayload {
    iat: number;
    ext: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT Token is missing.');
    }

    //O token vem na forma: Bearer sohhuanxuaqjduha.qwjeijd.wiaiuhu
    //Então, só queremos a segunda posição, que pode ser pegada da forma:
    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as TokenPayload;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT Token.');
    }
}
