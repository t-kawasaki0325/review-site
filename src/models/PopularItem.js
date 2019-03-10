import { db } from '../firebase';
import { Product } from '../models';

class PopularItem {
  static popularItemDocRef = doc => {
    return db.collection('popular_item').doc(doc);
  };

  static popularItemProductRef = doc => {
    return db
      .collection('popular_item')
      .doc(doc)
      .collection('product');
  };

  static updatePopularItem = async (now, doc) => {
    Promise.all([
      // レビュー/閲覧数の多いアイテムのリセット
      PopularItem.resetPopularItem(doc),
      // 直近1時間でレビュー/閲覧数が多いsaasの登録
      PopularItem.insertPopularItem(doc, doc),
      // すべてのsaasのレビュー/閲覧数リセット
      Product.resetColumn(doc),
      // 更新時間の更新
      PopularItem.updateTimeToNow(doc, now),
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
    const limit = document === 'recently_viewed' ? 4 : 5;

    const batch = db.batch();

    const snapshot = await Product.getSearchData(column)
      .limit(limit)
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
