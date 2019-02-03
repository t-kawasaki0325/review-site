import firebase, { providerGoogle } from '../firebase';

export const loginWithGoogle = async () => {
  firebase.auth().signInWithRedirect(providerGoogle);
  await firebase.auth.getRedirectResult();
  await firebase.auth.catch();
};

export const loginWithEmail = async (email, password) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password);
};
