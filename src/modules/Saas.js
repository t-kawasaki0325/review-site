import { Product } from '../models';

class Saas {
  static registerProduct = info => {
    Product.registerProduct(info);
  };

  static getAllSaas = () => {
    return Product.getAllProducts();
  };
}

export default Saas;
