import { fixProfilePicSize } from './fixProfilePicSize';

describe('addSizeToGoogleProfilePic', () => {
  it('adds size parameter to a Google user content URL without parameters', () => {
    const url = 'https://example.googleusercontent.com/photo.jpg';
    const expected = 'https://example.googleusercontent.com/photo.jpg?sz=150';
    expect(fixProfilePicSize(url)).toBe(expected);
  });

  it('returns the same URL if it is not a Google user content URL', () => {
    const url = 'https://example.com/photo.jpg';
    expect(fixProfilePicSize(url)).toBe(url);
  });

  it('returns the same URL if it already has parameters', () => {
    const url = 'https://example.googleusercontent.com/photo.jpg?param=value';
    expect(fixProfilePicSize(url)).toBe(url);
  });
});
