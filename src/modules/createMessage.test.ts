import { createMessage, insertNewMessage } from './createMessage';

describe('createMessage', () => {
  test('createMessage should create a message element with correct attributes', () => {
    const id = '123';
    const timestamp = 1618320000000;
    const messageElement = createMessage(id, timestamp);

    expect(messageElement).toBeDefined();
    expect(messageElement.id).toBe(id);
    expect(Number(messageElement.getAttribute('timestamp'))).toBe(timestamp);
  });
});

describe('insertNewMessage', () => {
  test('insertNewMessage should insert a message element in the correct position', () => {
    const messageListElement = document.createElement('div');
    const newMessageElement = document.createElement('div');
    newMessageElement.setAttribute('timestamp', '1618310000000');

    const firstMessage = document.createElement('div');
    firstMessage.setAttribute('timestamp', '1618320000000');
    messageListElement.appendChild(firstMessage);

    const secondMessage = document.createElement('div');
    secondMessage.setAttribute('timestamp', '1618300000000');
    messageListElement.appendChild(secondMessage);

    insertNewMessage(messageListElement, newMessageElement);

    expect(messageListElement.children[0]).toBe(newMessageElement);
  });
});

describe('insertNewMessage', () => {
  test('insertNewMessage should insert message at the end if all existing messages are older', () => {
    const messageListElement = document.createElement('div');
    const newMessageElement = document.createElement('div');
    newMessageElement.setAttribute('timestamp', '1618310000000');

    const firstMessage = document.createElement('div');
    firstMessage.setAttribute('timestamp', '1618300000000');
    messageListElement.appendChild(firstMessage);

    const secondMessage = document.createElement('div');
    secondMessage.setAttribute('timestamp', '1618300000000');
    messageListElement.appendChild(secondMessage);

    insertNewMessage(messageListElement, newMessageElement);

    expect(messageListElement.children[2]).toBe(newMessageElement);
  });
});
