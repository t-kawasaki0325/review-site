import { Review } from '../models';

class Evaluation {
  static addReview = (saasId, info) => {
    Review.createNewReview(saasId, info);
  };
}

export default Evaluation;
