import { db } from '../firebase';
import { ModelUtil } from '../utils';
import { POINT } from '../config';

class Review {
  static createNewReview = async (uid, saasId, info) => {
    const batch = db.batch();

    const reviewRef = db.collection('review').doc();
    const productRef = db.collection('product').doc(saasId);
    const userRef = db.collection('user').doc(uid);
    const saasSnapshot = await productRef.get();
    const userSnapshot = await userRef.get();
    const saas = saasSnapshot.data();
    const user = userSnapshot.data();

    const point = ModelUtil.calculatePoint(saas, info);
    const currentPoint = ModelUtil.getCurrentPoint(info);
    saas.review.push(reviewRef);

    batch.set(productRef, {
      ...saas,
      numOfReviews: saas.numOfReviews + 1,
      recentlyReviewed: saas.recentlyReviewed + 1,
      point: point,
      review: saas.review,
    });
    batch.set(userRef, {
      ...user,
      point: { ...user.point, current: user.point.current + POINT.ADD_REVIEW },
    });
    batch.set(reviewRef, Object.assign(info, { point: currentPoint }));

    batch.commit();
  };
}

export default Review;
