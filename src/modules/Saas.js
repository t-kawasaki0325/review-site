import { Product } from '../models';

class Saas {
  static registerProduct = info => {
    return Product.registerProduct(info);
  };

  static searchSaas = (sortBy, query) => {
    return Product.getSearchData(sortBy, query);
  };

  static sassInfoById = id => {
    return Product.getInfoById(id);
  };
}

export default Saas;
