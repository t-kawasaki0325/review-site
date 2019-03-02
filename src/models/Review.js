import { db } from '../firebase';
import { ModelUtil } from '../utils';

class Review {
  static createNewReview = async info => {
    const { id } = info;
    const productRef = db.collection('product').doc(id);
    const snapshot = await productRef.get();
    const saas = snapshot.data();

    const point = ModelUtil.calculatePoint(saas, info);

    productRef.set({
      numOfReview: saas.numOfReview + 1,
      point: point,
    });
  };
}

export default Review;
