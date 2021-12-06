
import { Application, Request, Response } from "express";
import { BaseController } from "../BaseController";
import { ResponseHandler, Utils } from "./../../helpers";
import {BrandLib} from './brand.lib';
import {Messages} from "../../constants"
import {IBrand}  from "./brand.type"

/**
 * UserController
 */
export class BrandController extends BaseController {
  constructor() {
    super();
    this.init();
  }

  public init(): void {
    this.router.post("/", this.createBrand);
  }

  public register(app: Application): void {
    app.use("/api/brand", this.router);
  }

  public async createBrand(req: Request, res: Response): Promise<void> {
    try {
      const brandReq : IBrand = req.body;
      const brandLib: BrandLib = new BrandLib()
       const brand = await brandLib.createBrand(brandReq);
      res.locals.data = brand;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "createBrand");
    }
  }


}
