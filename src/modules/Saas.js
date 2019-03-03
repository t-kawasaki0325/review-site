import { Product, PopularItem } from '../models';
import firebase from '../firebase';

class Saas {
  static registerProduct = info => {
    return Product.registerProduct(info);
  };

  static searchSaas = async (sortBy, query) => {
    const { category, companyServiceType, companyScale, companyRegion } = query;

    const snapshot = await Product.getSearchData(sortBy).get();
    return snapshot.docs.filter(doc => {
      let saas = doc.data();
      if (category && saas) saas = saas.category === category ? saas : null;
      if (companyServiceType && saas)
        saas = saas.companyServiceType === companyServiceType ? saas : null;
      if (companyScale && saas)
        saas = saas.companyScale === companyScale ? saas : null;
      if (companyRegion && saas)
        saas = saas.companyRegion === companyRegion ? saas : null;
      return saas;
    });
  };

  static sassInfoById = id => {
    return Product.getInfoById(id);
  };

  static recentlyManyReviewed = () => {
    return PopularItem.manyReviewed();
  };

  static updatePopularItemIfOld = async () => {
    const snapshot = await PopularItem.getUpdateAt();
    const { updated_at } = snapshot.data();
    const now = firebase.firestore.Timestamp.now();
    if (now.seconds - updated_at.seconds > 3600) {
      PopularItem.updatePopularItem(now);
    }
  };
}

export default Saas;
