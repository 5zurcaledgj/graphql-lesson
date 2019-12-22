import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCAG3KMAqgOrpQ5eDjaPOCZ7bBAR2f0M0U",
  authDomain: "crwn-clothing-39252.firebaseapp.com",
  databaseURL: "https://crwn-clothing-39252.firebaseio.com",
  projectId: "crwn-clothing-39252",
  storageBucket: "crwn-clothing-39252.appspot.com",
  messagingSenderId: "171432311133",
  appId: "1:171432311133:web:bf0ea6ab5cb74e959ad0b4",
  measurementId: "G-VZR6L1JECB"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
