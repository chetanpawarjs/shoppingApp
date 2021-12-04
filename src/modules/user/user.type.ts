import { Document } from "mongoose";
export interface IUser extends Document {
  _id: string;
  password?: string;
  email?: string;
  username?: string;
  contactNo?: number;
  created_date?: Date;
  token?: string;
  roleId: any;
  employeeId: string;
  mpin: string;
  isActive: boolean;
  isDelete: boolean;
  role?: string;
  siteName?: string;
  siteId?: any;
  shiftStarted?: any;
  shiftStartTime?: any;
  shiftStopTime?: any;
}

export interface IUserRequest {
  _id?: string;
  password?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  created_date?: Date;
  token?: string;
  tmp_forgot_pass_code?: number;
  tmp_forgot_pass_datetime?: Date;
  siteId?: string;
  workType?: any;
  resourceCount?: number;
  sprayingCount?: number;
  segregationCount?: number;
  mpin?: string;
  isActive?: boolean;
  username?: string;
  roleId?: string;
  contactNo?: number;
  fileName?: string;
  shiftStarted?: any;
  shiftStartTime?: any;
  shiftStopTime?: any;
}
