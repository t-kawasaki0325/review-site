import firebase, { providerGoogle } from '../firebase';
import User from '../model';

class Authentication {
  static loginWithGoogle = () => {
    firebase.auth().signInWithRedirect(providerGoogle);
  };

  static completeLoginWithGoogle = async () => {
    const { user } = await firebase.auth().getRedirectResult();
    if (user) {
      User.createNewUser(user.uid);
    }
  };

  static loginWithEmail = async (email, password) => {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    User.createNewUser(user.uid);
  };
}

export default Authentication;
