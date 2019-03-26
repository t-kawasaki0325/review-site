import { db, now } from '../firebase';
import { POINT } from '../config';
import { ModelUtil } from '../utils';

class User {
  static async createUser(uid, info) {
    const {
      name,
      company,
      scale,
      serviceType,
      department,
      position,
      region,
    } = info;

    const batch = db.batch();

    const userRef = User.fetchUserRef(uid);
    const companyRef = db.collection('company').doc();

    batch.set(companyRef, {
      name: company,
      scale: scale,
      service_type: serviceType,
      region: region,
    });
    batch.set(userRef, {
      name: name,
      position: position,
      department: department,
      company_ref: companyRef,
      point: POINT.INITIAL.value,
      point_history: [Object.assign(POINT.INITIAL, { date: now })],
      can_view: [],
      reviewed: [],
    });

    batch.commit();
  }

  static updateUser = (uid, info) => {
    const {
      name,
      company,
      scale,
      serviceType,
      department,
      position,
      region,
    } = info;

    const userRef = User.fetchUserRef(uid);

    db.runTransaction(transaction => {
      return transaction.get(userRef).then(doc => {
        const companyRef = doc.data().company_ref;
        transaction.update(userRef, {
          name: name,
          position: position,
          department: department,
        });
        transaction.update(companyRef, {
          name: company,
          scale: scale,
          service_type: serviceType,
          region: region,
        });
      });
    });
  };

  static fetchUserRef = uid => {
    return db.collection('user').doc(uid);
  };

  static changePoint = (uid, saasId, point) => {
    const userRef = User.fetchUserRef(uid);

    db.runTransaction(transaction => {
      return transaction.get(userRef).then(doc => {
        const data = doc.data();
        const newPoint = data.point + point;
        const canView = data.can_view.concat([saasId]);
        const history = ModelUtil.addPointHistory(
          data.point_history,
          POINT.VIEW_REVIEW
        );
        transaction.update(userRef, {
          can_view: canView,
          point: newPoint,
          point_history: history,
        });
      });
    });
  };
}

export default User;
