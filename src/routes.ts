import * as express from 'express';
import { UserController } from './modules/user/user.controller';
import {BrandController} from './modules/brand/brand.controller';


export function registerRoutes(app: express.Application): void {
  new UserController().register(app);
  new BrandController().register(app);
}
