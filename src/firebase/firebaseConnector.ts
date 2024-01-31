import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import firebaseConfig from './firebase.config';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const googleAuthProvider = new GoogleAuthProvider();

export function isUserSignedIn() {
  return !!getAuth().currentUser;
}
