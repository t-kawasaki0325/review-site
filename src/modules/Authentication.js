import firebase, { providerGoogle } from '../firebase';
import { User } from '../models';
import { PATH, MESSAGE } from '../config';

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
    return { isNewUser: isNewUser, user: user };
  };

  static createNewUser = (uid, info, history) => {
    if (!uid || !info || !history) return;
    User.createUser(uid, info);
    history.push(PATH.TOP);
  };

  static signupWithEmail = async (info, history) => {
    if (!info || !history) return;
    const { email, password } = info;

    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      User.createUser(user.uid, info);
      if (user) {
        history.push(PATH.TOP);
      }
    } catch (e) {
      switch (e.code) {
        case 'auth/network-request-failed':
          return MESSAGE.ERROR.NETWORK;
        case 'auth/email-already-in-use':
          return MESSAGE.ERROR.ALREADY_EXIST;
        default:
          return MESSAGE.ERROR.COMMON;
      }
    }
  };

  static loginWithEmail = async (email, password, history) => {
    if (!email || !password || !history) return;
    try {
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (user) {
        history.push(PATH.TOP);
      }
    } catch (e) {
      switch (e.code) {
        case 'auth/network-request-failed':
          return MESSAGE.ERROR.NETWORK;
        case 'auth/wrong-password':
          return MESSAGE.ERROR.WRONG_PASSWORD;
        default:
          return MESSAGE.ERROR.COMMON;
      }
    }
  };

  static logout = history => {
    if (!history) return;
    firebase.auth().signOut();
    history.push(PATH.ROOT);
  };

  static fetchUserId = () => {
    return new Promise(resolve => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user.uid);
        } else {
          resolve(null);
        }
      });
    });
  };

  static transitionLoginIfNotLogin = async history => {
    if (!history) return;
    const uid = await Authentication.fetchUserId();
    if (uid) {
      return uid;
    }

    history.push(PATH.LOGIN);
  };

  static transisionTopIfLogin = async history => {
    if (!history) return;
    const uid = await Authentication.fetchUserId();
    if (uid) history.push(PATH.TOP);
  };

  static fetchUserDataById = id => {
    if (!id) return;
    return User.fetchUserRef(id).get();
  };

  static updateUserInfo = info => {
    if (!info) return;
    const { uid } = info;
    User.updateUser(uid, info);
    return MESSAGE.COMPLETE.REGISTRATION;
  };
}

export default Authentication;
