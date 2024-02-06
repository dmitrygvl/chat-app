import { signInWithRedirect } from 'firebase/auth';
import store from '../store/store';
import { renderAppUI } from './renderAppUI';

export function updateUI() {
  const rootEl = document.getElementById('app') as HTMLDivElement;
  if (rootEl) {
    renderAppUI(rootEl, store.getState());
  }
}
