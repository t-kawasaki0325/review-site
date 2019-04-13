import { User } from '../models';
import { POINT } from '../config';

class Point {
  static useForViewReview = (uid, saasId) => {
    if (!uid || !saasId) return;
    User.changePoint(uid, saasId, POINT.VIEW_REVIEW.value);
  };
}

export default Point;
