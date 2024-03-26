import { parseEmoji } from './parseEmoji';

jest.mock('./emoji', () => ({
  emoji: [
    { img: 'clown.svg', title: 'clown', preview: '🤡' },
    { img: 'heart.svg', title: 'heart', preview: '❤️' },
    { img: 'laughter.svg', title: 'laughter', preview: '😃' },
    { img: 'laughter.svg', title: 'laughter', preview: '😃' },
    { img: 'no.svg', title: 'no', preview: '👎' },
    { img: 'rage.svg', title: 'rage', preview: '😡' },
    { img: 'sad.svg', title: 'sad', preview: '😢' },
    { img: 'smile.svg', title: 'smile', preview: '🙂' },
    { img: 'yes.svg', title: 'yes', preview: '👍' },
  ],
}));

describe('parseEmoji', () => {
  it('replaces emoji characters with their respective images', () => {
    const message = 'Hello 🤡, are you 😃 today?';
    const parsedMessage = parseEmoji(message);

    expect(parsedMessage).toContain(
      '<img src=clown.svg alt="Emoji" width=18px heght=18px/>',
    );
    expect(parsedMessage).toContain(
      '<img src=laughter.svg alt="Emoji" width=18px heght=18px/>',
    );
  });

  it('returns the same string if no emojis are present', () => {
    const message = 'Hello, no emoji here!';
    const parsedMessage = parseEmoji(message);

    expect(parsedMessage).toBe(message);
  });
});
