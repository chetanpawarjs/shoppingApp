import * as express from 'express';
import { UserController } from './modules/user/user.controller';
import {AuthController} from './modules/auth/auth.controller'


export function registerRoutes(app: express.Application): void {
  new UserController().register(app);
  new AuthController().register(app);
}
