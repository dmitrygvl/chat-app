import { renderAppUI } from './UI/renderAppUI';
import store from './store/store';
import { listenToAuth } from './actions/auth';
import { listenToUsers } from './actions/users';
import { listenToMessages } from './actions/messages';
import './styles/styles.css';

store.dispatch(listenToAuth());
store.dispatch(listenToUsers());
store.dispatch(listenToMessages());

const rootEl = document.getElementById('app') as HTMLDivElement;

store.subscribe(() => renderAppUI(rootEl, store.getState()));
