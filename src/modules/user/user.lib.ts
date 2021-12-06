
import { userModel } from "./user.model";
import { IUser , IUserRequest} from "./user.type";
/**
 * UserLib
 *
 */
export class UserLib {

  public async createUser(userDetails: IUserRequest) : Promise<IUser>{
    const userObject: any = new userModel(userDetails);
    return userObject.save();
  }
  public async getUsers() : Promise<IUser[]>{
    return userModel.find();
  }
  public async getUser(username: string) : Promise<IUserRequest>{
    return userModel.findOne({username: username});
  }
  public async updateUser(userId: string, userDetails:IUserRequest) : Promise<any>{
    return userModel.findOneAndUpdate({_id: userId}, {$set:userDetails},{new:true});
  }
  public async deleteUser(userId: string) : Promise<any>{
    return userModel.findOneAndRemove({_id: userId});
  }
}
