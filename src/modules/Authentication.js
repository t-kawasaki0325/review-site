import firebase, { providerGoogle } from '../firebase';
import { User } from '../models';
import { PATH } from '../config';

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
          return 'ネットワーク接続がありません';
        case 'auth/email-already-in-use':
          return '既にユーザーが存在します';
        default:
          return 'エラーが発生しました。再度お試しください';
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
          return 'ネットワーク接続がありません';
        case 'auth/wrong-password':
          return 'メールアドレスとパスワードが一致しません';
        default:
          return 'エラーが発生しました。再度お試しください';
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
    return '登録が完了しました';
  };
}

export default Authentication;
