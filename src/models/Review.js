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

  static editReview = async (saasId, info, reviewId) => {
    const batch = db.batch();

    const reviewRef = db.collection('review').doc(reviewId);
    const productRef = db.collection('product').doc(saasId);

    const saasSnapshot = await productRef.get();
    const reviewSnapshot = await reviewRef.get();
    if (!saasSnapshot.exists || !reviewSnapshot.exists) return;

    const saas = saasSnapshot.data();
    const review = reviewSnapshot.data();

    let salesReviewNum = saas.sales_review_num;
    let salesAverage = saas.point.sales;
    let salesTotal = salesAverage * salesReviewNum;
    if (info.sales !== '' && review.sales !== '') {
      const diff = info.sales - review.sales;
      salesTotal += diff;
      salesAverage = salesTotal / salesReviewNum;
    }
    if (info.sales === '' && review.sales !== '') {
      salesReviewNum -= 1;
      salesTotal = salesTotal - review.sales - 1;
      salesAverage = salesReviewNum !== 0 ? salesTotal / salesReviewNum : 0;
    }
    if (info.sales !== '' && review.sales === '') {
      salesReviewNum += 1;
      salesTotal = salesTotal + review.sales + 1;
      salesAverage = salesTotal / salesReviewNum;
    }
    batch.update(productRef, {
      point: { ...saas.point, sales: salesAverage },
      sales_review_num: salesReviewNum,
    });

    let recommendationReviewNum = saas.recommendation_review_num;
    let recommendationAverage = saas.point.recommendation;
    let recommendationTotal = recommendationAverage * recommendationReviewNum;
    if (info.recommendation !== '' && review.recommendation !== '') {
      const diff = info.recommendation - review.recommendation;
      recommendationTotal += diff;
      recommendationAverage = recommendationTotal / recommendationReviewNum;
    }
    if (info.recommendation === '' && review.recommendation !== '') {
      recommendationReviewNum -= 1;
      recommendationTotal = recommendationTotal - review.recommendation - 1;
      recommendationAverage =
        recommendationReviewNum !== 0
          ? recommendationTotal / recommendationReviewNum
          : 0;
    }
    if (info.recommendation !== '' && review.recommendation === '') {
      recommendationReviewNum += 1;
      recommendationTotal = recommendationTotal + review.recommendation + 1;
      recommendationAverage = recommendationTotal / recommendationReviewNum;
    }
    batch.update(productRef, {
      point: { ...saas.point, recommendation: recommendationAverage },
      recommendation_review_num: recommendationReviewNum,
    });

    let supportReviewNum = saas.support_review_num;
    let supportAverage = saas.point.support;
    let supportTotal = supportAverage * supportReviewNum;
    if (info.support !== '' && review.support !== '') {
      const diff = info.support - review.support;
      supportTotal += diff;
      supportAverage = supportTotal / supportReviewNum;
    }
    if (info.support === '' && review.support !== '') {
      supportReviewNum -= 1;
      supportTotal = supportTotal - review.support - 1;
      supportAverage =
        supportReviewNum !== 0 ? supportTotal / supportReviewNum : 0;
    }
    if (info.support !== '' && review.support === '') {
      supportReviewNum += 1;
      supportTotal = supportTotal + review.support + 1;
      supportAverage = supportTotal / supportReviewNum;
    }
    batch.update(productRef, {
      point: { ...saas.point, support: supportAverage },
      support_review_num: supportReviewNum,
    });

    let satisfactionReviewNum = saas.satisfaction_review_num;
    let satisfactionAverage = saas.point.satisfaction;
    let satisfactionTotal = satisfactionAverage * satisfactionReviewNum;
    if (info.satisfaction !== '' && review.satisfaction !== '') {
      const diff = info.satisfaction - review.satisfaction;
      satisfactionTotal += diff;
      satisfactionAverage = satisfactionTotal / satisfactionReviewNum;
    }
    if (info.satisfaction === '' && review.satisfaction !== '') {
      satisfactionReviewNum -= 1;
      satisfactionTotal = satisfactionTotal - review.satisfaction - 1;
      satisfactionAverage =
        satisfactionReviewNum !== 0
          ? satisfactionTotal / satisfactionReviewNum
          : 0;
    }
    if (info.satisfaction !== '' && review.satisfaction === '') {
      satisfactionReviewNum += 1;
      satisfactionTotal = satisfactionTotal + review.satisfaction + 1;
      satisfactionAverage = satisfactionTotal / satisfactionReviewNum;
    }
    batch.update(productRef, {
      point: { ...saas.point, satisfaction: satisfactionAverage },
      satisfaction_review_num: satisfactionReviewNum,
    });

    let utilizationReviewNum = saas.utilization_review_num;
    let utilizationAverage = saas.point.utilization;
    let utilizationTotal = utilizationAverage * utilizationReviewNum;
    if (info.utilization !== '' && review.utilization !== '') {
      const diff = info.utilization - review.utilization;
      utilizationTotal += diff;
      utilizationAverage = utilizationTotal / utilizationReviewNum;
    }
    if (info.utilization === '' && review.utilization !== '') {
      utilizationReviewNum -= 1;
      utilizationTotal = utilizationTotal - review.utilization - 1;
      utilizationAverage =
        utilizationReviewNum !== 0
          ? utilizationTotal / utilizationReviewNum
          : 0;
    }
    if (info.utilization !== '' && review.utilization === '') {
      utilizationReviewNum += 1;
      utilizationTotal = utilizationTotal + review.utilization + 1;
      utilizationAverage = utilizationTotal / utilizationReviewNum;
    }
    batch.update(productRef, {
      point: { ...saas.point, utilization: utilizationAverage },
      utilization_review_num: utilizationReviewNum,
    });

    const pointTotal =
      (salesTotal +
        recommendationTotal +
        satisfactionTotal +
        utilizationTotal +
        supportTotal) /
      (salesReviewNum +
        recommendationReviewNum +
        satisfactionReviewNum +
        utilizationReviewNum +
        supportReviewNum);
    batch.update(productRef, {
      point_total: pointTotal,
    });

    const currentPoint = ModelUtil.getCurrentPoint(info);
    const object = ModelUtil.objectKeyChangeCase(info);
    batch.set(reviewRef, Object.assign(object, { point: currentPoint }));

    batch.commit();

    return '編集が完了しました';
  };

  static getDataById = id => {
    return db.collection('review').doc(id);
  };
}

export default Review;
