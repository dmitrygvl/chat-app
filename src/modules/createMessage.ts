export function createMessage(id: string, timestamp: number): HTMLDivElement {
  const container = document.createElement('div');
  container.innerHTML = `<div class="message-container"><div class="spacing"><div class="pic"></div></div><div class="message"></div><div class="name"></div></div>`;
  const messageElement = container.firstChild as HTMLDivElement;
  messageElement.setAttribute('id', id);
  messageElement.setAttribute('timestamp', String(timestamp || Date.now()));
  return messageElement;
}

export function insertNewMessage(
  messageListElement: HTMLDivElement,
  newMessageElement: HTMLDivElement,
): void {
  const existingMessages = messageListElement.children;
  let inserted = false;

  for (let i = 0; i < existingMessages.length; i++) {
    const currentMessage = existingMessages[i];
    const currentMessageTime = Number(currentMessage.getAttribute('timestamp'));

    if (
      Number(newMessageElement.getAttribute('timestamp')) < currentMessageTime
    ) {
      messageListElement.insertBefore(newMessageElement, currentMessage);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    // Если не найдено подходящее место, добавить в конец списка
    messageListElement.appendChild(newMessageElement);
  }
}

// Использование
// const messageListElement = document.querySelector('.messages') as HTMLDivElement;
// const newMessageId = 'msg_1';
// const newMessageTimestamp = Date.now();
// const newMessageElement = createNewMessage(newMessageId, newMessageTimestamp);
// insertNewMessage(messageListElement, newMessageElement);
