import { Review } from '../models';
import { PATH } from '../config';
import { UrlUtil } from '../utils';

class Evaluation {
  static addReview = async (uid, saasId, info, history) => {
    if (!uid || !saasId || !info || !history) {
      history.push(UrlUtil.changeBaseUrl(PATH.SAAS_DETAIL, saasId), {
        message: 'エラーが発生しました。再度お試しください',
      });
    }
    const result = await Review.createNewReview(uid, saasId, info);
    history.push(UrlUtil.changeBaseUrl(PATH.SAAS_DETAIL, saasId), {
      message: result,
    });
  };

  static editReview = async (saasId, info, reviewId, history) => {
    if (!saasId || !info || !reviewId || !history) {
      history.push(UrlUtil.changeBaseUrl(PATH.SAAS_DETAIL, saasId), {
        message: 'エラーが発生しました。再度お試しください',
      });
    }
    const result = await Review.editReview(saasId, info, reviewId);
    history.push(UrlUtil.changeBaseUrl(PATH.SAAS_DETAIL, saasId), {
      message: result,
    });
  };

  static getReviewById = async reviewId => {
    return await Review.getDataById(reviewId).get();
  };
}

export default Evaluation;
