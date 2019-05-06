import { db } from '../firebase';
import { User } from '../models';

class Invitation {
  static sendInvitation = async (sender, receiver) => {
    const invitation = db.collection('invitation').doc(receiver);
    const data = await invitation.get();

    if (data.data()) throw new Error('auth/email-already-invited');

    invitation.set({ uid: sender });
  };

  static loginInvitationUser = async email => {
    const invitation = db.collection('invitation').doc(email);
    const document = await invitation.get();

    if (!document.exists) return;

    User.rewardForInviteUser(document.data().uid);
    invitation.delete();
  };
}

export default Invitation;
