import { Document, Model, model, PaginateModel, Schema } from "mongoose";
import * as mongoosePaginate from "mongoose-paginate";
import { IBrand } from "./brand.type";

export const brandSchema: Schema = new Schema(
  {
    brandName: {
      type: String,
    },
    brandLogo: {
      type: String,
    },
    brandOwner: {
      type: String,
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

brandSchema.plugin(mongoosePaginate);
interface IBrandModel<T extends Document> extends PaginateModel<T> {}

export const brandModel: IBrandModel<IBrand> = model<IBrand>("Brand", brandSchema);