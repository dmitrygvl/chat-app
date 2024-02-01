import { onAuthStateChanged, User } from 'firebase/auth';
import { AppDispatch } from '../store/store';
import { signedIn, signedOut, startListeningToAuthChanges } from './auth';

jest.mock('firebase/auth', () => {
  const originalModule = jest.requireActual('firebase/auth');

  return {
    __esModule: true,
    ...originalModule,
    onAuthStateChanged: jest.fn(() => 'Hello world'),
  };
});

describe('check module auth', () => {
  const user = {
    email: 'dmitrygvl@gmail.com',
    displayName: 'dmitrygvl',
    photoURL:
      'https://lh3.googleusercontent.com/a/ACg8ocIq28sZgNYK_GIcYBpqA43a09vcKnmbwGDS8tVUE6QMA2Nw=s96-c',
    uid: 'bdAx0tG5tbgepxOOuN6tXrKOWEv1',
  } as User;

  it('check signedIn', () => {
    const result = signedIn(user);

    expect(result.type).toBe('SIGN_IN');
    expect(result.payload.uid).toBe('bdAx0tG5tbgepxOOuN6tXrKOWEv1');
  });

  it('check signedOut', () => {
    const result = signedOut();

    expect(result.type).toBe('SIGN_OUT');
    expect(result.payload.uid).toBeNull();
  });

  it('check startListeningToAuthChanges', () => {
    const dispath: AppDispatch = jest.fn();

    startListeningToAuthChanges()(dispath);
    expect(onAuthStateChanged).toHaveBeenCalled();
  });
});
