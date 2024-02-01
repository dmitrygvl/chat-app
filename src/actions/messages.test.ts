import { onChildAdded, get, update } from 'firebase/database';
import { AppDispatch } from '../store/store';
import {
  createMessage,
  clearMessages,
  loadMessages,
  listenToMessages,
} from './messages';

jest.mock('firebase/database', () => {
  const originalModule = jest.requireActual('firebase/database');

  return {
    __esModule: true,
    ...originalModule,
    onChildAdded: jest.fn(() => 'Hello!'),
    get: jest.fn((p) => ({
      val: () => 'Hello!',
    })),
    update: jest.fn(() => 'Hi!'),
  };
});

describe('check module messages', () => {
  const messages = {
    mid: '07667cd1-b542-401b-97e9-821db4146917',
    content: 'Hello world',
    displayName: 'dmitrygvl',
    photoURL:
      'https://lh3.googleusercontent.com/a/ACg8ocIq28sZgNYK_GIcYBpqA43a09vcKnmbwGDS8tVUE6QMA2Nw=s96-c',
    timestamp: 1686287845764,
    uid: 'bdAx0tG5tbgepxOOuN6tXrKOWEv1',
  };

  it('check clearMessages', () => {
    const result = clearMessages();

    expect(result.type).toBe('CLEAR_MESSAGES');
  });

  it('check createMessage', () => {
    createMessage(
      messages.mid,
      messages.content,
      messages.uid,
      messages.displayName,
      messages.photoURL,
    );

    expect(update).toHaveBeenCalled();
  });

  it('check loadMessages', async () => {
    const result = await loadMessages();

    expect(get).toHaveBeenCalled();
    expect(result).toBe('Hello!');
  });

  it('check listenToMessages', () => {
    const dispatch: AppDispatch = jest.fn();

    listenToMessages()(dispatch);
    expect(onChildAdded).toHaveBeenCalled();
  });
});
