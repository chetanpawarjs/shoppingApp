import { Application, Request, Response } from "express";
import { BaseController } from "../BaseController";
import { ResponseHandler, Utils } from "./../../helpers";
import { UserLib } from "./user.lib";
import { IUser, IUserRequest } from "./user.type";
import {Messages} from "../../constants"

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
    this.router.put("/:id", this.updateUser);
    this.router.delete("/:id", this.deleteUser);
    this.router.get("/:id", this.getUser);
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
      const users: IUser[] = await userLib.getUsers();
      res.locals.data = users;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "getUsers");
    }
  }
  public async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userLib: UserLib = new UserLib()
      const userId : string = req.params.id;
      const user: IUserRequest = await userLib.getUser(userId);
      res.locals.data = user || {};
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "getUser");
    }
  }
  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.id;
      const userReq: IUserRequest = req.body;
      const userLib: UserLib = new UserLib()
      const users: IUser[] = await userLib.updateUser(userId, userReq);
      res.locals.data = users;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "updateUser");
    }
  }
   public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId: string = req.params.id;
      const userLib: UserLib = new UserLib()
      const users: IUser[] = await userLib.deleteUser(userId);
      res.locals.data = users;
      res.locals.message = Messages.DELETE_USER_SUCCESSFULLY;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "updateUser");
    }
  }

}
