import { User } from '../models';
import { POINT } from '../config';

class Point {
  static useForViewReview = (uid, saasId) => {
    User.changePoint(uid, saasId, POINT.VIEW_REVIEW.value);
  };
}

export default Point;
