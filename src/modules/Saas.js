import { Product, PopularItem } from '../models';

class Saas {
  static registerProduct = info => {
    return Product.registerProduct(info);
  };

  static searchSaas = async (sortBy, query) => {
    const { category, companyServiceType, companyScale, companyRegion } = query;

    const snapshot = await Product.getSearchData(sortBy);
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
}

export default Saas;
