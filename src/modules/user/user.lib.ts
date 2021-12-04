import * as bcrypt from "bcrypt";
import { userModel } from "./user.model";
import { IUser , IUserRequest} from "./user.type";
/**
 * UserLib
 *
 */
export class UserLib {
  public async generateHash(password: string): Promise<string> {
    return bcrypt.hashSync(password, 10);
  }

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return bcrypt.compareSync(password, hash);
  }

  public async createUser(userDetails: IUserRequest) : Promise<IUser>{
    const userObject: any = new userModel(userDetails);
    return userObject.save();
  }
  public async getUser() : Promise<IUser[]>{
    return userModel.find();
  }
}
