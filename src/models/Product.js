import { db } from '../firebase';
import { SAAS } from '../config';
import { ModelUtil } from '../utils';

class Product {
  static productRef = id => {
    return db.collection('product').doc(id);
  };

  static async registerProduct(info) {
    const { company, serviceType, scale, region, name, category } = info;

    const batch = db.batch();

    const productRef = db.collection('product').doc();
    const companyRef = db.collection('company').doc();

    batch.set(companyRef, {
      name: company,
      service_type: serviceType,
      scale: scale,
      region: region,
    });
    batch.set(productRef, {
      name: name,
      category: category,
      company_ref: companyRef,
      num_of_reviews: 0,
      point: Object.assign(ModelUtil.initializeKeys(SAAS.RADAR), { total: 0 }),
      company_region: region,
      company_scale: scale,
      company_service_type: serviceType,
      review: [],
      recently_reviewed: 0,
    });

    batch.commit();

    return '登録が完了しました';
  }

  static getSearchData = sortBy => {
    return db.collection('product').orderBy(sortBy, 'desc');
  };

  static resetColumn = async column => {
    const batch = db.batch();

    const snapshot = await db
      .collection('product')
      .where(column, '>', 0)
      .get();
    snapshot.docs.forEach((doc, index) => {
      const data = doc.data();
      batch.set(doc.ref, { ...data, [column]: 0 });
      if (index % 500 === 0 || snapshot.docs.length - 1 === index) {
        batch.commit();
      }
    });
  };
}

export default Product;
