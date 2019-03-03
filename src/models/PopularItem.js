import { db } from '../firebase';
import { Product } from '../models';

class PopularItem {
  static manyReviewed = async () => {
    return await db
      .collection('popular_item')
      .doc('recently_reviewed')
      .collection('item')
      .get();
  };

  static getUpdateAt = () => {
    return db
      .collection('popular_item')
      .doc('recently_reviewed')
      .get();
  };

  static updatePopularItem = async now => {
    Promise.all([
      // レビュー数の多いアイテムのリセット
      PopularItem.resetPopularItem('recently_reviewed'),
      // 直近1時間でレビュー数が多いsaasの登録
      PopularItem.insertPopularItem('recentlyReviewed', 'recently_reviewed'),
      // すべてのsaasのレビュー数リセット
      Product.resetColumn('recentlyReviewed'),
      // 更新時間の更新
      PopularItem.updateTimeToNow('recently_reviewed', now),
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
      batch.set(ref, data);
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
