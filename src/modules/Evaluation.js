import { Review } from '../models';

class Evaluation {
  static addReview = (uid, saasId, info) => {
    Review.createNewReview(uid, saasId, info);
  };
}

export default Evaluation;
