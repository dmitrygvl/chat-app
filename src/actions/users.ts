import { ref, onChildAdded } from 'firebase/database';
import { database } from '../firebase/firebaseConnector';
import { AppDispatch } from '../store/store';
import { IUser } from '../types';

const usersRef = ref(database, 'users');

export const addUser = (user: IUser) => {
  const payload = {
    [user.uid]: {
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
      email: user.email,
    },
  };
  return {
    type: 'ADD_USER',
    payload,
  };
};

export const startListeningForUsers = () => {
  return (dispatch: AppDispatch) => {
    onChildAdded(usersRef, (snapshot) => {
      dispatch(addUser(snapshot.val() as IUser));
    });
  };
};
