import { Product } from '../models';

class Saas {
  static registerProduct = info => {
    Product.registerProduct(info);
  };

  static sortedData = sortBy => {
    return Product.getSortedData(sortBy);
  };
}

export default Saas;
