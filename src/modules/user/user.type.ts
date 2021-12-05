import { Document } from "mongoose";
export interface IUser extends Document {
  _id: string;
  password: string;
  email?: string;
  username?: string;
  city: string,
  state: string,
  country: string
}

export interface IUserRequest {
  password?: string;
  email?: string;
  username?: string;
  city?: string,
  state?: string,
  country?: string
}