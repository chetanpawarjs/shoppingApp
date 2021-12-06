import { Document } from "mongoose";
export interface IBrand extends Document {
  _id: string;
  brandName?: string;
  brandLogo?: string;
  brandOwner?: string;
}
