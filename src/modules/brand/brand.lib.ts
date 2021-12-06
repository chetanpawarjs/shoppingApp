
import {IBrand} from './brand.type';
import {brandModel} from './brand.model';
/**
 * UserLib
 *
 */
export class BrandLib {

  public async createBrand(brandDetails: IBrand) : Promise<IBrand>{
    const brandrObject: any = new brandModel(brandDetails);
    return brandrObject.save();
  }
}
