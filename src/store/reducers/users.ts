import type { AnyAction } from 'redux';
import initialState from '../initialState';
import { IUsers } from '../../../types/types';

export default function usersReducer(
  state = initialState.users,
  action: AnyAction,
) {
  switch (action.type) {
    case 'ADD_USER':
      return { ...state, ...(action.payload as IUsers) };
    default:
      return state;
  }
}
