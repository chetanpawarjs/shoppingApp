import { Application , Request, Response} from "express";
import { AuthHelper, ResponseHandler } from "../../helpers";
import { BaseController } from "../BaseController";
import { IUserRequest } from "modules/user/user.type";
import {UserLib} from "../user/user.lib"
import { Messages, JWT } from "../../constants";

export class AuthController extends BaseController {
    constructor() {
    super();
    this.init();
  } 
  public init(): void {
    this.router.post("/", this.loginUser);
  }
  public register(app: Application): void {
    app.use("/api/auth", this.router);
  }
 public async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const authHelper: AuthHelper = new AuthHelper();
      const userReq: any = req.body;
      const userLib: UserLib = new UserLib();
      const userDetails: IUserRequest = await userLib.getUserByEmail(userReq.email);
      if (!userDetails) {
        throw new Error(Messages.INVALID_CREDENTIAL)
      }
      const isValid: boolean = await userLib.comparePassword(userReq.password, userDetails.password);
      if (!isValid) {
        throw new Error(Messages.INVALID_CREDENTIAL)
      }
      delete userDetails.password;
      const token: string = await authHelper.generateToken(userDetails, JWT.secret, {expiresIn: JWT.expiresIn});
      userDetails.token = token;
      res.locals.data = userDetails;
      res.locals.message = Messages.LOGIN_SUCESSFULLY;
      ResponseHandler.JSONSUCCESS(req, res);
    } catch (err) {
      res.locals.data = err;
      ResponseHandler.JSONERROR(req, res, "loginUser");
    }
  }

}