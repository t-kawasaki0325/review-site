import { db } from '../firebase';
import { SAAS } from '../config';
import { ModelUtil } from '../utils';

class Product {
  static async registerProduct(info) {
    const { company, serviceType, scale, region, name, category } = info;

    const companyRef = await db.collection('company').add({
      name: company,
      service_type: serviceType,
      scale: scale,
      region: region,
    });

    db.collection('product').add({
      name: name,
      category: category,
      companyRef: companyRef,
      numOfReviews: 0,
      point: Object.assign(ModelUtil.initializeKeys(SAAS.RADAR), { total: 0 }),
      companyRegion: region,
      companyScale: scale,
      companyServiceType: serviceType,
      review: [],
    });
  }

  static getSearchData = async (sortBy, query) => {
    const { category, companyServiceType, companyScale, companyRegion } = query;

    let collection = db.collection('product');

    if (category) collection = collection.where('category', '==', category);
    if (companyServiceType)
      collection = collection.where(
        'companyServiceType',
        '==',
        companyServiceType
      );
    if (companyScale)
      collection = collection.where('companyScale', '==', companyScale);
    if (companyRegion)
      collection = collection.where('companyRegion', '==', companyRegion);

    return await collection.orderBy(sortBy, 'desc').get();
  };

  static getInfoById = async id => {
    return await db
      .collection('product')
      .doc(id)
      .get();
  };
}

export default Product;
