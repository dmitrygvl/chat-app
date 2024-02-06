import { createMessage } from './createMessage';

describe('createMessage', () => {
  it('adds a new message to an empty message list', () => {
    const messageListElement = document.createElement('div');
    const id = 'msg_1';
    const timestamp = Date.now();

    const newMessage = createMessage(messageListElement, id, timestamp);

    expect(newMessage).toBeInstanceOf(HTMLDivElement);
    expect(newMessage.id).toBe(id);
    expect(newMessage.getAttribute('timestamp')).toBe(String(timestamp));
    expect(messageListElement.children).toHaveLength(1);
    expect(messageListElement.firstChild).toBe(newMessage);
  });

  it('inserts a new message in the correct order based on timestamp', () => {
    const messageListElement = document.createElement('div');
    const existingMessage = document.createElement('div');
    existingMessage.setAttribute('timestamp', String(Date.now()));
    messageListElement.appendChild(existingMessage);

    const id = 'msg_2';
    const earlierTimestamp = Date.now() - 1000;

    const newMessage = createMessage(messageListElement, id, earlierTimestamp);

    expect(messageListElement.children).toHaveLength(2);
    expect(messageListElement.firstChild).toBe(newMessage);
    expect(newMessage.getAttribute('timestamp')).toBe(String(earlierTimestamp));
  });

  it('adds a new message to the end of the list when existing messages were sent earlier', () => {
    const messageListElement = document.createElement('div');
    const existingMessage = document.createElement('div');
    existingMessage.setAttribute('timestamp', String(Date.now() - 10000));
    messageListElement.appendChild(existingMessage);

    const id = 'msg_3';
    const newMessageTimestamp = Date.now();

    const newMessage = createMessage(
      messageListElement,
      id,
      newMessageTimestamp,
    );

    expect(newMessage).toBeInstanceOf(HTMLDivElement);
    expect(newMessage.id).toBe(id);
    expect(newMessage.getAttribute('timestamp')).toBe(
      String(newMessageTimestamp),
    );
    expect(messageListElement.children).toHaveLength(2);
    expect(messageListElement.lastChild).toBe(newMessage);
  });
});
