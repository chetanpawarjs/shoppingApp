
import { Application, Request, Response } from "express";
import { BaseController } from "../BaseController";
import { ResponseHandler, Utils, AuthHelper } from "./../../helpers";
import { UserLib } from "./user.lib";
import { IUser, IUserRequest } from "./user.type";
import {Messages} from "../../constants"
import {userRules} from './user.rules';
/**
 * UserController
 */
export class UserController extends BaseController {
  constructor() {
    super();
    this.init();
  }

  public init(): void {
    const authHelper: AuthHelper = new AuthHelper();
    this.router.post("/",userRules.createUser,authHelper.validation,this.createUser);
    this.router.get("/", authHelper.adminGuard, this.getUsers);
    this.router.put("/:id", authHelper.adminGuard, this.updateUser);
    this.router.delete("/:id", this.deleteUser);
    this.router.get("/:id", this.getUser);
  }

  public register(app: Application): void {
    app.use("/api/users", this.router);
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      // const error: any = validationResult(req);
      // if(error.array().length > 0) {
      //   throw error.array();
      // }
      const userReq : IUserRequest = req.body; 
      // if(!userReq.username || userReq.username.length <= 2) {
      //     throw new Error('Invalid username')
      // }
      // console.log("emailRegex.test(userReq)", emailRegex.test(userReq.email));
      // // if(!userReq.email || !emailRegex.test(userReq.email)) {
      // //     throw new Error('Invalid email')
      // // }
      // if(!userReq.password || userReq.password.length <= 8) {
      //     throw new Error('Invalid password')
      // }
      // if(!userReq.city || userReq.city.length <= 2) {
      //     throw new Error('Invalid city')
      // }
      // if(!userReq.state || userReq.state.length <= 2) {
      //     throw new Error('state is required')
      // }
      // if(!userReq.country || userReq.country.length <= 2) {
      //     throw new Error('country is required')
      // }
      // if(!userReq.age || userReq.age > 0) {
      //     throw new Error('age is required')
      // }
      // if(!userReq.contactNo || userReq.contactNo.length === 10 ) {
      //     throw new Error('contactNo is required')
      // }
      const userLib: UserLib = new UserLib()
      console.log('userReq', userReq);
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
      console.log('in get users');
      const users: IUser[] = await userLib.getUsers();
      console.log('users', users);
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
      const username : string = req.params.uname;
      const user: IUserRequest = await userLib.getUser(username);
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
