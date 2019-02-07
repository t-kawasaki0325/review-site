import { db } from '../firebase';

class User {
  static createNewUser(uid, info) {
    const { name, company, scale, serviceType, department, position } = info;
    db.collection('user').add({
      user_id: uid,
      name: name,
      company: company,
      scale: scale,
      serviceType: serviceType,
      department: department,
      position: position,
    });
  }
}

export default User;
