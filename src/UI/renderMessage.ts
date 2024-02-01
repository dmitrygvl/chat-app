import { parseEmoji } from '../modules/parseEmoji';
import { fixProfilePicSize } from '../modules/fixProfilePicSize';
import { createMessage } from '../modules/createMessage';

export function renderMessage(
  el: HTMLDivElement,
  id: string,
  timestamp: number,
  name: string,
  text: string,
  picUrl: string,
) {
  const messageListElement = el.querySelector('#messages') as HTMLDivElement;

  const div = createMessage(messageListElement, id, timestamp);

  if (picUrl) {
    const picDiv = div.querySelector('.pic') as HTMLDivElement;
    picDiv.style.backgroundImage = `url(${fixProfilePicSize(picUrl)})`;
  }

  const nameDiv = div.querySelector('.name') as HTMLDivElement;
  nameDiv.textContent = name;
  const messageElement = div.querySelector('.message') as HTMLDivElement;

  if (text) {
    messageElement.innerHTML = parseEmoji(text);
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  }

  setTimeout(() => {
    div.classList.add('visible');
  }, 1);

  messageListElement.scrollTop = messageListElement.scrollHeight;

  const messageInputElement = el.querySelector('#message') as HTMLInputElement;

  messageInputElement.focus();
}
