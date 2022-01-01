import * as bcrypt from "bcrypt";
import { userModel } from "./user.model";
import { IUser , IUserRequest} from "./user.type";
/**
 * UserLib
 *
 */
export class UserLib {
  public async generateHash (password: string) : Promise<string>{
    return bcrypt.hashSync(password, 10);
  }

  public async comparePassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    console.log(password, hash)
    return bcrypt.compareSync(password, hash);
  }

  public async createUser(userDetails: IUserRequest) : Promise<IUser>{
    userDetails.password = await this.generateHash(userDetails.password);
    const userObject: any = new userModel(userDetails);
    return userObject.save();
  }
  public async getUsers() : Promise<IUser[]>{
    return userModel.find();
  }
  public async getUser(username: string) : Promise<IUserRequest>{
    return userModel.findOne({username: username});
  }
   public async getUserByEmail(email: string) : Promise<IUserRequest>{
    return userModel.findOne({email: email}).select('email username password country role').lean();
  }
  public async updateUser(userId: string, userDetails:IUserRequest) : Promise<any>{
    return userModel.findOneAndUpdate({_id: userId}, {$set:userDetails},{new:true});
  }
  public async deleteUser(userId: string) : Promise<any>{
    return userModel.findOneAndRemove({_id: userId});
  }
}
