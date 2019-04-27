import { db } from '../firebase';

class Invitation {
  static sendInvitation = (sender, receiver) => {
    db.collection('invitation')
      .doc(receiver)
      .set({ uid: sender });
  };
}

export default Invitation;
