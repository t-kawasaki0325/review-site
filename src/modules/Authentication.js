import firebase, { providerGoogle } from '../firebase';
import User from '../models';

class Authentication {
  static loginWithGoogle = () => {
    firebase.auth().signInWithRedirect(providerGoogle);
  };

  static completeLoginWithGoogle = async history => {
    const result = await firebase.auth().getRedirectResult();
    const { user } = result;

    // ログインor会員登録でなければreturn
    if (!user) return;

    const isNewUser = result.additionalUserInfo.isNewUser;
    if (isNewUser) {
      return history.push(`/registration/${user.uid}`);
    }

    return history.push('/top');
  };

  static createNewUser = (uid, info, history) => {
    User.createNewUser(uid, info);
    history.push('/top');
  };

  static signupWithEmail = async (info, history) => {
    const { email, password } = info;

    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    User.createNewUser(user.uid, info);
    if (user) {
      history.push('/top');
    }
  };

  static loginWithEmail = async (email, password, history) => {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    if (user) {
      history.push('/top');
    }
  };
}

export default Authentication;
