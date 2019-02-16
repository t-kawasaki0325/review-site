import { Product } from '../models';

class Saas {
  static registerProduct = info => {
    Product.registerProduct(info);
  };
}

export default Saas;
