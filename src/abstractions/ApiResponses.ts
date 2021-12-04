export interface IStandardResponse {
  success: boolean;
  message?: string;
}

export interface IPagination {
  total?: number;
  limit?: number;
  page?: number;
  pages?: number;
  adCount?: number;
}
export interface IStandardErrorResponse extends IStandardResponse {
  error?: any;
  details?: any;
  functionName?: string;
  data?: any;
  request?: any;
}

export interface IStandardSuccessResponse extends IStandardResponse {
  data: object;
  info?: IInfo;
  pagination?: IPagination;
  fromTime?: string;
  toTime?: string;
}
export interface IInfo {
  userId: boolean;
  functionName: string;
  request: any;
}
