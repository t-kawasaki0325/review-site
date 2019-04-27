import { db } from '../firebase';
import { User } from '../models';

class Invitation {
  static sendInvitation = (sender, receiver) => {
    db.collection('invitation')
      .doc(receiver)
      .set({ uid: sender });
  };

  static loginInvitationUser = async email => {
    const invitation = db.collection('invitation').doc(email);
    const document = await invitation.get();

    User.rewardForInviteUser(document.data().uid);
  };
}

export default Invitation;
