import { db } from '../firebase';
import { Product } from '../models';

class PopularItem {
  static recentlyReviewedRef = () => {
    return db.collection('popular_item').doc('recently_reviewed');
  };

  static manyReviewedProductRef = () => {
    return PopularItem.recentlyReviewedRef().collection('product');
  };

  static recentlyViewedRef = () => {
    return db.collection('popular_item').doc('recently_viewed');
  };

  static updatePopularItem = async now => {
    Promise.all([
      // レビュー数の多いアイテムのリセット
      PopularItem.resetPopularItem('recently_reviewed'),
      // 直近1時間でレビュー数が多いsaasの登録
      PopularItem.insertPopularItem('recently_reviewed', 'recently_reviewed'),
      // すべてのsaasのレビュー数リセット
      Product.resetColumn('recently_reviewed'),
      // 更新時間の更新
      PopularItem.updateTimeToNow('recently_reviewed', now),
    ]);
  };

  static updateManyViewedItem = async now => {
    Promise.all([
      // 閲覧数の多いアイテムのリセット
      PopularItem.resetPopularItem('recently_viewed'),
      // 直近1時間で閲覧数が多いsaasの登録
      PopularItem.insertPopularItem('recently_viewed', 'recently_viewed'),
      // すべてのsaasの閲覧数リセット
      Product.resetColumn('recently_viewed'),
      // 更新時間の更新
      PopularItem.updateTimeToNow('recently_viewed', now),
    ]);
  };

  static resetPopularItem = async document => {
    const batch = db.batch();
    const snapshot = await db
      .collection('popular_item')
      .doc(document)
      .collection('product')
      .get();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    batch.commit();
  };

  static insertPopularItem = async (column, document) => {
    const batch = db.batch();

    const snapshot = await Product.getSearchData(column)
      .limit(5)
      .get();
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      const ref = db
        .collection('popular_item')
        .doc(document)
        .collection('product')
        .doc();
      batch.set(ref, { ...data, saasId: doc.id });
    });
    batch.commit();
  };

  static updateTimeToNow = async (column, now) => {
    db.collection('popular_item')
      .doc(column)
      .set({ updated_at: now });
  };
}

export default PopularItem;
