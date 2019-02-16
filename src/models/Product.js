import { db } from '../firebase';

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
    });
  }
}

export default Product;
