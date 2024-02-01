export function fixProfilePicSize(url: string) {
  if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
    return `${url}?sz=150`;
  }
  return url;
}
