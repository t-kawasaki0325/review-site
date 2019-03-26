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
      sales_review_num: 0,
      support_review_num: 0,
      utilization_review_num: 0,
      recommendation_review_num: 0,
      satisfaction_review_num: 0,
      point: Object.assign(ModelUtil.initializeKeys(SAAS.RADAR), { total: 0 }),
      company_region: region,
      company_scale: scale,
      company_service_type: serviceType,
      review: [],
      recently_reviewed: 0,
      recently_viewed: 0,
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

  static viewCountUp = id => {
    const ref = Product.productRef(id);
    db.runTransaction(transaction => {
      return transaction.get(ref).then(doc => {
        const viewCount = doc.data().recently_viewed + 1;
        transaction.update(ref, { recently_viewed: viewCount });
      });
    });
  };
}

export default Product;
