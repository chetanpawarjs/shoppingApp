import { Document, Model, model, PaginateModel, Schema } from "mongoose";
import * as mongoosePaginate from "mongoose-paginate";

export const userReportSchema: Schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    siteId: {
      type: Schema.Types.ObjectId,
      ref: "Site",
    },
    shiftStartTime: {
      type: Date,
    },
    shiftEndTime: {
      type: Date,
    },
    activeHours: {
      type: Number,
    },
    workType: [
      {
        value: { type: String },
        label: { type: String },
      },
    ],
    isDelete: {
      type: Boolean,
      default: false,
    },
    resourceCount: {
      type: Number,
      default: 0,
    },
    sprayingCount: {
      type: Number,
      default: 0,
    },
    sieveMachineCount: {
      type: Number,
      default: 0,
    },
    ballisticSeparatorCount: {
      type: Number,
      default: 0,
    },
    densitySeparatorCount: {
      type: Number,
      default: 0,
    },
    excavatorCount: {
      type: Number,
      default: 0,
    },
    tripCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

userReportSchema.plugin(mongoosePaginate);
interface IUserReportModel<T extends Document> extends PaginateModel<T> {}

export const UserReportModel: IUserReportModel<any> = model<any>(
  "UserReport",
  userReportSchema
);
