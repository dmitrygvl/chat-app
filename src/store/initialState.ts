import { IState } from '../types';

const initialState: IState = {
  auth: {
    status: 'ANONYMOUS',
    email: null,
    displayName: null,
    photoURL: null,
    uid: null,
  },
  messages: {},
  users: {},
};

export default initialState;
