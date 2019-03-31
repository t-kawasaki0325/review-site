import { Review } from '../models';
import { PATH } from '../config';
import { UrlUtil } from '../utils';

class Evaluation {
  static addReview = async (uid, saasId, info, history) => {
    const result = await Review.createNewReview(uid, saasId, info);
    history.push(UrlUtil.changeBaseUrl(PATH.SAAS_DETAIL, saasId), {
      message: result,
    });
  };

  static getReviewById = async reviewId => {
    return await Review.getDataById(reviewId).get();
  };
}

export default Evaluation;
