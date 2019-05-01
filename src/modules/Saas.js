import { Product, PopularItem, User } from '../models';
import { now } from '../firebase';

class Saas {
  static registerProduct = info => {
    if (!info) return;
    return Product.registerProduct(info);
  };

  static searchSaas = async (sortBy, query) => {
    if (!sortBy || !query) return;
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
    if (!id) return;
    return Product.productRef(id).get();
  };

  static recentlyManyReviewed = () => {
    return PopularItem.popularItemProductRef('recently_reviewed').get();
  };

  static recentlyManyViewed = () => {
    return PopularItem.popularItemProductRef('recently_viewed').get();
  };

  static updatePopularItemIfOld = async doc => {
    if (!doc) return;
    const snapshot = await PopularItem.popularItemDocRef(doc).get();
    const { updated_at } = snapshot.data();
    if (now.seconds - updated_at.seconds > 3600) {
      PopularItem.updatePopularItem(now, doc);
    }
  };

  static viewCountUp = id => {
    if (!id) return;
    return Product.viewCountUp(id);
  };

  static followSaaS = (uid, saasId) => {
    if (!uid || !saasId) return;

    User.addFollowList(uid, saasId);
    Product.addFollowedList(uid, saasId);
  };
}

export default Saas;
