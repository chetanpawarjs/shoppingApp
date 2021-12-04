import { Document, Model, model, PaginateModel, Schema } from "mongoose";
import * as mongoosePaginate from "mongoose-paginate";
import { IUser } from "./user.type";

export const userSchema: Schema = new Schema(
  {
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userSchema.plugin(mongoosePaginate);
interface IUserModel<T extends Document> extends PaginateModel<T> {}

export const userModel: IUserModel<IUser> = model<IUser>("User", userSchema);
