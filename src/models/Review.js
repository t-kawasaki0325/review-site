import { db } from '../firebase';
import { ModelUtil } from '../utils';

class Review {
  static createNewReview = async (saasId, info) => {
    const batch = db.batch();

    const reviewRef = db.collection('review').doc();
    const productRef = db.collection('product').doc(saasId);
    const snapshot = await productRef.get();
    const saas = snapshot.data();

    const point = ModelUtil.calculatePoint(saas, info);
    saas.review.push(reviewRef);

    batch.set(productRef, {
      ...saas,
      numOfReviews: saas.numOfReviews + 1,
      recentlyReviewed: saas.recentlyReviewed + 1,
      point: point,
      review: saas.review,
    });
    batch.set(reviewRef, info);

    batch.commit();
  };
}

export default Review;
