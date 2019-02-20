import { db } from '../firebase';

class User {
  static async createNewUser(uid, info) {
    const {
      name,
      company,
      scale,
      serviceType,
      department,
      position,
      region,
    } = info;

    const ref = await db.collection('company').add({
      name: company,
      scale: scale,
      serviceType: serviceType,
      region: region,
    });

    db.collection('user')
      .doc(uid)
      .set({
        name: name,
        position: position,
        department: department,
        companyRef: ref,
      });
  }

  static fetchById = async uid => {
    return db
      .collection('user')
      .doc(uid)
      .get();
  };
}

export default User;
