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
    if (!saasSnapshot.exists || !userSnapshot.exists) return;

    const saas = saasSnapshot.data();
    const user = userSnapshot.data();

    const point = ModelUtil.calculatePoint(saas, info);
    const total = ModelUtil.averagePoint(
      saas.point_total,
      ModelUtil.getCurrentAverage(info),
      saas.num_of_reviews
    );
    saas.review.push(reviewRef);

    batch.set(productRef, {
      ...saas,
      num_of_reviews: saas.num_of_reviews + 1,
      sales_review_num: ModelUtil.incrementArgumentIfNotEmpty(
        info.sales,
        saas.sales_review_num
      ),
      satisfaction_review_num: ModelUtil.incrementArgumentIfNotEmpty(
        info.satisfaction,
        saas.satisfaction_review_num
      ),
      support_review_num: ModelUtil.incrementArgumentIfNotEmpty(
        info.support,
        saas.support_review_num
      ),
      utilization_review_num: ModelUtil.incrementArgumentIfNotEmpty(
        info.utilization,
        saas.utilization_review_num
      ),
      recommendation_review_num: ModelUtil.incrementArgumentIfNotEmpty(
        info.recommendation,
        saas.recommendation_review_num
      ),
      recently_reviewed: saas.recently_reviewed + 1,
      point: point,
      point_total: total,
      review: saas.review,
    });

    const history = ModelUtil.addPointHistory(
      user.point_history,
      POINT.ADD_REVIEW
    );
    user.reviewed.push({ review_ref: reviewRef, product_ref: productRef });
    batch.set(userRef, {
      ...user,
      reviewed: user.reviewed,
      point: user.point + POINT.ADD_REVIEW.value,
      point_history: history,
    });

    const currentPoint = ModelUtil.getCurrentPoint(info);
    const object = ModelUtil.objectKeyChangeCase(info);
    batch.set(reviewRef, Object.assign(object, { point: currentPoint }));

    batch.commit();

    return '登録が完了しました';
  };

  static getDataById = id => {
    return db.collection('review').doc(id);
  };
}

export default Review;
