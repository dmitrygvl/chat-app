export function createMessage(
  messageListElement: HTMLDivElement,
  id: string,
  timestamp: number,
) {
  const container = document.createElement('div');
  container.innerHTML = `<div class="message-container"><div class="spacing"><div class="pic"></div></div><div class="message"></div><div class="name"></div></div>`;
  const div = container.firstChild as HTMLDivElement;
  div.setAttribute('id', id);

  timestamp = timestamp || Date.now();
  div.setAttribute('timestamp', String(timestamp));

  const existingMessages = messageListElement.children;
  if (existingMessages.length === 0) {
    messageListElement.appendChild(div);
  } else {
    let messageListNode = existingMessages[0];

    while (messageListNode) {
      const messageListNodeTime = messageListNode.getAttribute('timestamp');

      if (Number(messageListNodeTime) > timestamp) {
        break;
      }

      messageListNode = messageListNode.nextSibling as HTMLDivElement;
    }

    messageListElement.insertBefore(div, messageListNode);
  }

  return div;
}
