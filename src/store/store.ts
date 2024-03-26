import { configureStore } from '@reduxjs/toolkit';
import initialState from './initialState';
import authReducer from './reducers/auth';
import messagesReducer from './reducers/messages';
import usersReducer from './reducers/users';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    messages: messagesReducer,
  },
  preloadedState: initialState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
