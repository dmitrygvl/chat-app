import { ref, child, set } from 'firebase/database';
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import pick from 'lodash/pick';
import {
  auth,
  database,
  googleAuthProvider,
} from '../firebase/firebaseConnector';
import { AppDispatch } from '../store/store';
import { IAuth } from '../types';
import { addMessages, clearMessages, loadMessages } from './messages';

const usersRef = ref(database, 'users');

export const signIn = async () => {
  signInWithPopup(auth, googleAuthProvider);
};

export const comeOut = () => {
  signOut(auth);
};

export const signedIn = (user: User) => {
  const payload: IAuth = {
    status: 'SIGNED_IN',
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    uid: user.uid,
  };
  return {
    type: 'SIGN_IN',
    payload,
  };
};

export const signedOut = () => {
  const payload: IAuth = {
    status: 'ANONYMOUS',
    email: null,
    displayName: null,
    photoURL: null,
    uid: null,
  };
  return {
    type: 'SIGN_OUT',
    payload,
  };
};

export const startListeningToAuthChanges = () => {
  return (dispatch: AppDispatch) => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        dispatch(signedIn(user));
        set(
          child(usersRef, user.uid),
          pick(user, ['displayName', 'photoURL', 'email', 'uid']),
        );
        const messages = await loadMessages();

        if (messages) {
          dispatch(addMessages(messages));
        }
      } else {
        dispatch(signedOut());
        dispatch(clearMessages());
      }
    });
  };
};
