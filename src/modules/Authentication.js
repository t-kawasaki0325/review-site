import firebase, { providerGoogle } from '../firebase';
import { User, Invitation } from '../models';
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
    Authentication.addPointIfInvitationUser();
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
      Authentication.addPointIfInvitationUser();
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

  static resetPassword = async email => {
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      return { message: MESSAGE.COMPLETE.MAIL_SENT, type: 'info' };
    } catch (e) {
      switch (e.code) {
        case 'auth/invalid-email':
          return { message: MESSAGE.VALIDATION.MAIL, type: 'error' };
        case 'auth/user-not-found':
          return { message: MESSAGE.ERROR.USER_NOTO_EXISTS, type: 'error' };
        default:
          return { message: MESSAGE.ERROR.COMMON, type: 'error' };
      }
    }
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

  static invitation = async (uid, info) => {
    if (!info) return;

    const { email } = info;

    try {
      await firebase.auth().sendSignInLinkToEmail(email, {
        url:
          'https://' +
          process.env.REACT_APP_FIREBASE_AUTH_DOMAIN +
          PATH.REGISTRATION,
        handleCodeInApp: true,
      });
      await Invitation.sendInvitation(uid, email);
      return { type: 'info', message: MESSAGE.COMPLETE.MAIL_SENT };
    } catch (e) {
      if (e.message === 'auth/email-already-invited')
        return { type: 'error', message: MESSAGE.ERROR.ALREADY_INVITED };

      switch (e.code) {
        case 'auth/network-request-failed':
          return { type: 'error', message: MESSAGE.ERROR.NETWORK };
        default:
          return { type: 'error', message: MESSAGE.ERROR.COMMON };
      }
    }
  };

  static addPointIfInvitationUser = async () => {
    const { email } = firebase.auth().currentUser;
    if (!email) return;

    Invitation.loginInvitationUser(email);
  };

  static quit = async (uid, history) => {
    const user = firebase.auth().currentUser;
    if (!uid || !user) return;

    try {
      await user.delete();

      await User.deleteUser(uid);
      history.push(PATH.LOGIN);
    } catch (e) {
      Authentication.logout();
    }
  };
}

export default Authentication;
