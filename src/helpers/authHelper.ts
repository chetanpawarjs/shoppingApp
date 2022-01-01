import {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator';
import { ResponseHandler } from './response.handler';
import  * as jwt from 'jsonwebtoken';
import { JWT, Messages } from '../constants';

export class AuthHelper {
    public async validation (req:Request , res:Response, next: NextFunction) {
        try {
                const error: any = validationResult(req);
                if(error.array().length > 0) {
                    throw error.array();
                }
                next();

        } catch(err) {
             res.locals.data = err;
             ResponseHandler.JSONERROR(req, res, "validation");
        }

    }

    public async guard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token: any = req.headers.authorization;
            if (token) {
                const auth: any  = jwt.verify(token, JWT.secret);
                req.body.loginUserId = auth._id;
                console.log('auth');
                next();
            } else {
                throw new Error(Messages.INVALID_CREDENTIAL)
            }

        } catch(err) {
             res.locals.data = err;
             ResponseHandler.JSONERROR(req, res, "guard");
        }
    }
     public async adminGuard(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const token: any = req.headers.authorization;
            if (token) {
                const auth: any  = jwt.verify(token, JWT.secret);
                console.log('auth', auth)
                if(auth.role === 'admin') {
                    req.body.loginUserId = auth._id;
                    next();
                } else {
                 throw new Error(Messages.INVALID_CREDENTIAL)
                }
                  
            } else {
                throw new Error(Messages.INVALID_CREDENTIAL)
            }
        } catch(err) {
             res.locals.data = err;
             ResponseHandler.JSONERROR(req, res, "adminGuard");
        }
    }
     public async generateToken(userDetails: any, secretKey: string, jwtConfig: any): Promise<string> {
            return jwt.sign(userDetails, secretKey, jwtConfig);
     }
}; 