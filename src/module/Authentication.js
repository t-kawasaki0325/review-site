import firebase, { providerGoogle } from '../firebase';
import User from '../model/User';

export const loginWithGoogle = () => {
  firebase.auth().signInWithRedirect(providerGoogle);
};

export const completeLoginWithGoogle = async () => {
  const { user } = await firebase.auth().getRedirectResult();
  if (user) {
    User.createNewUser(user.uid);
  }
};

export const loginWithEmail = async (email, password) => {
  const { user } = await firebase
    .auth()
    .createUserWithEmailAndPassword(email, password);
  User.createNewUser(user.uid);
};
