import { Document, Model, model, PaginateModel, Schema } from "mongoose";
import * as mongoosePaginate from "mongoose-paginate";
import { IUser } from "./user.type";

export const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
    },
    paswword: {
      type: String,
    },
    username: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    }
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
