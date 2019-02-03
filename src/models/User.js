import { db } from '../firebase';

class User {
  static createNewUser(uid) {
    db.collection('user').add({
      user_id: uid,
    });
  }
}

export default User;
