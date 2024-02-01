import { ref, onChildAdded, update, get } from 'firebase/database';
import { database, isUserSignedIn } from '../firebase/firebaseConnector';
import { AppDispatch } from '../store/store';
import { IMessage, IMessages } from '../types';

const messagesRef = ref(database, 'messages');

export const addMessage = (
  mid: string,
  { content, uid, timestamp, displayName, photoURL }: IMessage,
) => {
  const payload = {
    [mid]: {
      displayName,
      photoURL,
      content,
      uid,
      timestamp,
    },
  };

  return {
    type: 'ADD_MESSAGE',
    payload,
  };
};

export const addMessages = (messages: IMessages) => {
  return {
    type: 'ADD_MESSAGES',
    payload: messages,
  };
};

export const clearMessages = () => {
  return {
    type: 'CLEAR_MESSAGES',
  };
};

export const createMessage = (
  mid: string,
  content: string,
  uid: string,
  displayName: string,
  photoURL: string,
) => {
  const message = {
    displayName,
    photoURL,
    content,
    uid,
    timestamp: Date.now(),
  };

  update(ref(database, `messages/${mid}`), message);
};

export const listenToMessages = () => {
  return (dispatch: AppDispatch) => {
    onChildAdded(messagesRef, (snapshot) => {
      if (isUserSignedIn()) {
        dispatch(addMessage(snapshot.key as string, snapshot.val()));
      }
    });
  };
};

export async function loadMessages(): Promise<any> {
  try {
    const snapshot = await get(messagesRef);

    return snapshot.val();
  } catch (e) {
    return null;
  }
}
