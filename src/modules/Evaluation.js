import { Review } from '../models';

class Evaluation {
  static addReview = info => {
    Review.createNewReview(info);
  };
}

export default Evaluation;
