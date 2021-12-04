import * as crypto from 'crypto';
import { PaginateResult } from 'mongoose';
import { IPagination } from '../abstractions/ApiResponses';

/**
 * Utils
 */
export class Utils {
  public getPaginateResponse<T>(response: PaginateResult<T>): IPagination {
    return {
      total: response.total,
      limit: response.limit,
      page: response.page,
      pages: response.pages,
    };
  }

  public async getToken(): Promise<number> {
    //const buffer: Buffer = await this.generateRandomBytes();

    return (Math.floor((parseInt(crypto.randomBytes(1).toString('hex'), 16) / 1000) * 90000) + 10000);
  }

  public async generateRandomBytes(): Promise<any> {
    return crypto.randomBytes(16);
  }
}
