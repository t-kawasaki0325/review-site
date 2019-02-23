import { db } from '../firebase';

class PopularItem {
  static manyReviewed = async () => {
    return await db
      .collection('popular_item')
      .doc('recently_reviewed')
      .collection('item')
      .get();
  };
}

export default PopularItem;
