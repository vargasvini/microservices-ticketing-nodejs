import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUserPayload } from '../interfaces/user-interfaces';

declare global{
    namespace Express {
        interface Request {
            currentUser?: IUserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    if(!req.session?.jwt){
        return next();
    }
    if (!req.session?.jwt) {
        return next();
      }
    try {
        const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!) as IUserPayload;  
        req.currentUser = payload;
    } catch (error) {

    }

    next();
};