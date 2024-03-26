import { emoji } from './emoji';

export function parseEmoji(message: string) {
  let parsedMessage = message;
  emoji.forEach((item) => {
    parsedMessage = parsedMessage.replaceAll(
      item.preview,
      `<img src=${item.img} alt="Emoji" width=18px heght=18px/>`,
    );
  });

  return parsedMessage;
}
