import { Product, PopularItem } from '../models';
import firebase from '../firebase';

class Saas {
  static registerProduct = info => {
    return Product.registerProduct(info);
  };

  static searchSaas = async (sortBy, query) => {
    const {
      keyword,
      category,
      companyServiceType,
      companyScale,
      companyRegion,
    } = query;

    const snapshot = await Product.getSearchData(sortBy).get();
    return snapshot.docs.filter(doc => {
      let saas = doc.data();
      if (keyword && saas) {
        saas =
          saas.name.toLowerCase().search(keyword.trim().toLowerCase()) !== -1
            ? saas
            : null;
      }
      if (category && saas) saas = saas.category === category ? saas : null;
      if (companyServiceType && saas)
        saas = saas.company_service_type === companyServiceType ? saas : null;
      if (companyScale && saas)
        saas = saas.company_scale === companyScale ? saas : null;
      if (companyRegion && saas)
        saas = saas.company_region === companyRegion ? saas : null;
      return saas;
    });
  };

  static sassInfoById = id => {
    return Product.productRef(id).get();
  };

  static recentlyManyReviewed = () => {
    return PopularItem.popularItemProductRef('recently_reviewed').get();
  };

  static recentlyManyReviewed = () => {
    return PopularItem.popularItemProductRef('recently_viewed').get();
  };

  static updatePopularItemIfOld = async doc => {
    const snapshot = await PopularItem.popularItemDocRef(doc).get();
    const { updated_at } = snapshot.data();
    const now = firebase.firestore.Timestamp.now();
    if (now.seconds - updated_at.seconds > 3600) {
      PopularItem.updatePopularItem(now, doc);
    }
  };

  static viewCountUp = id => {
    return Product.viewCountUp(id);
  };
}

export default Saas;
