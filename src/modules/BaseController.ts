import { Application, Router } from 'express';

/**
 * BaseController
 */
export abstract class BaseController {
  protected router: Router;
  protected constructor() {
    this.router = Router();
  }

  public abstract register(express: Application): void;
}
