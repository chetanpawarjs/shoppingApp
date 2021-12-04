
import { Application, Request, Response } from "express";
import { BaseController } from "../BaseController";
import { ResponseHandler, Utils } from "./../../helpers";
import { UserLib } from "./user.lib";
import { IUser, IUserRequest } from "./user.type";
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
    this.router.post("/", this.createUser);
    this.router.get("/", this.getUsers);
  }

  public register(app: Application): void {
    app.use("/api/users", this.router);
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userReq : IUserRequest = req.body;
      const userLib: UserLib = new UserLib()
      const users: IUser = await userLib.createUser(userReq);
      res.locals.data = users;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "createUser");
    }
  }
   public async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const userLib: UserLib = new UserLib()
      const users: IUser[] = await userLib.getUser();
      res.locals.data = users;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "getUser");
    }
  }

}
