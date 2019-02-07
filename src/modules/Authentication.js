import firebase, { providerGoogle } from '../firebase';
import User from '../models';

class Authentication {
  static loginWithGoogle = () => {
    firebase.auth().signInWithRedirect(providerGoogle);
  };

  static completeLoginWithGoogle = async () => {
    const result = await firebase.auth().getRedirectResult();
    const { user } = result;

    // ログインor会員登録でなければreturn
    if (!user) return;

    const isNewUser = result.additionalUserInfo.isNewUser;
    if (isNewUser) {
      User.createNewUser(user.uid);
    }
  };

  static signupWithEmail = async info => {
    const { email, password } = info;

    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    User.createNewUser(user.uid, info);
  };

  static loginWithEmail = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  };
}

export default Authentication;
