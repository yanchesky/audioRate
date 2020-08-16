import firebaseConfig from "./firebase_credentials"
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'


const app = firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore(app);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase