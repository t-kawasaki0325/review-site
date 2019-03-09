import { db } from '../firebase';
import { POINT } from '../config';

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

    const companyData = {
      name: company,
      scale: scale,
      serviceType: serviceType,
      region: region,
    };

    const userData = {
      name: name,
      position: position,
      department: department,
      companyRef: companyRef,
      point: POINT.INITIAL,
      canView: [],
    };

    batch.set(userRef, userData);
    batch.set(companyRef, companyData);
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
        const companyRef = doc.data().companyRef;
        transaction.update(userRef, {
          name: name,
          position: position,
          department: department,
        });
        transaction.update(companyRef, {
          name: company,
          scale: scale,
          serviceType: serviceType,
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
        const newPoint = doc.data().point + point;
        const canView = doc.data().canView.concat([saasId]);
        transaction.update(userRef, { canView: canView, point: newPoint });
      });
    });
  };
}

export default User;
