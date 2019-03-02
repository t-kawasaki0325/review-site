import { db } from '../firebase';
import { SAAS } from '../config';
import { ModelUtil } from '../utils';

class Product {
  static async registerProduct(info) {
    const { company, serviceType, scale, region, name, category } = info;

    const batch = db.batch();

    const productRef = db.collection('product').doc();
    const companyRef = db.collection('company').doc();

    const companyData = {
      name: company,
      service_type: serviceType,
      scale: scale,
      region: region,
    };

    const productData = {
      name: name,
      category: category,
      companyRef: companyRef,
      numOfReviews: 0,
      point: Object.assign(ModelUtil.initializeKeys(SAAS.RADAR), { total: 0 }),
      companyRegion: region,
      companyScale: scale,
      companyServiceType: serviceType,
      review: [],
      recentlyReviewed: 0,
    };

    batch.set(companyRef, companyData);
    batch.set(productRef, productData);
    batch.commit();

    return '登録が完了しました';
  }

  static getSearchData = async sortBy => {
    return await db
      .collection('product')
      .orderBy(sortBy, 'desc')
      .get();
  };

  static getInfoById = async id => {
    return await db
      .collection('product')
      .doc(id)
      .get();
  };
}

export default Product;
