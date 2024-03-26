export interface IUser {
  displayName: string;
  email: string;
  uid: string;
  photoURL: string;
}

export type IUsers = Record<string, IUser>;

export interface IAuth {
  status: 'ANONYMOUS' | 'SIGNED_IN';
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  uid: string | null;
}

export interface IMessage {
  displayName: string;
  photoURL: string;
  content: string;
  uid: string;
  timestamp: number;
}

export type IMessages = Record<string, IMessage>;

export interface IState {
  auth: IAuth;
  messages: IMessages;
  users: IUsers;
}
