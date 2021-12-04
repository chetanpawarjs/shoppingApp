import { Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as _ from 'lodash';
import {
  IStandardErrorResponse,
  IStandardSuccessResponse,
} from '../abstractions/ApiResponses';
import { Messages } from '../constants';
/**
 * response handler class
 */
// tslint:disable-next-line:no-unnecessary-class
export class ResponseHandler {
  public static JSONSUCCESS(req: Request, res: Response): void {
    const obj: IStandardSuccessResponse = {
      success: true,
      data: res.locals.data,
      pagination: res.locals.pagination,
      message: res.locals.message || Messages.SUCCESS_RECEIVED,
    };

    res.status(HttpStatus.OK).jsonp(obj);
  }

  public static JSONERROR(req: Request, res: Response, apiName: string): void {
    let obj: IStandardErrorResponse;
    const showErrors: boolean =
      ['production', 'prod'].indexOf(process.env.NODE_ENV) > 0 ? false : true;
    const errors: any = res.locals.data;
    let details: any = [];
    let message: string = res.locals.data.message;
    if (errors.name === 'ValidationError') {
      // mongoErr
      for (const key in res.locals.data.errors) {
        const value: any = res.locals.data.errors[key];
        details.push({
          msg: value.message,
          param: value.path,
        });
      }
      message = res.locals.data._message;
    } else {
      // validation error
      if (res.locals.data.length) {
        res.locals.data.map((data: any) => {
          data.location = undefined;
        });
        details = res.locals.data;
      }
    }
    const errorCode: number = res.locals.statusCode || HttpStatus.BAD_REQUEST;
    obj = {
      success: false,
      details: details,
      message: message || Messages.SOMETHING_BAD,
    };
    // error logs
    obj.functionName = apiName;
    showErrors ? obj : delete obj.details;
    res.status(errorCode).send(obj);
  }
}
