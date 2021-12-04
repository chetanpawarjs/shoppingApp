import * as express from 'express';
import { UserController } from './modules/user/user.controller';


export function registerRoutes(app: express.Application): void {
  new UserController().register(app);
}
