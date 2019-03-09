import { db } from '../firebase';

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

    const userRef = db.collection('user').doc(uid);
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
    };

    batch.set(userRef, userData);
    batch.set(companyRef, companyData);
    batch.commit();
  }

  // TODO: userがupdateされたときの処理を追加
  static updateUser = (uid, info) => {
    return { uid, info };
  };

  static fetchById = async uid => {
    return db
      .collection('user')
      .doc(uid)
      .get();
  };
}

export default User;
