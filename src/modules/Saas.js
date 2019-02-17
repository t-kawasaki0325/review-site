import { Product } from '../models';

class Saas {
  static registerProduct = info => {
    Product.registerProduct(info);
  };

  static searchSaas = (sortBy, query) => {
    return Product.getSearchData(sortBy, query);
  };
}

export default Saas;
