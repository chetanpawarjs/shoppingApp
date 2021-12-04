
import { Application, Request, Response } from "express";
import { BaseController } from "../BaseController";
import { ResponseHandler, Utils } from "./../../helpers";
import { UserLib } from "./user.lib";
// const upload: any = multer();

/**
 * UserController
 */
export class UserController extends BaseController {
  constructor() {
    super();
    this.init();
  }

  public init(): void {
    this.router.get("/", this.getUsers);
  }

  public register(app: Application): void {
    app.use("/api/users", this.router);
  }

  public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const utils: Utils = new Utils();
      const filters: any = { isDelete: false };
      const select: string = "-password";

      const user: UserLib = new UserLib();
      if (req.query.roleId) {
        filters.roleId = req.query.roleId;
      }
      if (req.query.isActive) {
        filters.isActive = req.query.isActive;
      }
      if (req.query.siteId) {
        filters.siteId = req.query.siteId;
      }
      // const users: any = await user.getUsers(filters, select);
      // res.locals.data = users;
      // res.locals.pagination = utils.getPaginateResponse(users);
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "getUsers");
    }
  }

}
