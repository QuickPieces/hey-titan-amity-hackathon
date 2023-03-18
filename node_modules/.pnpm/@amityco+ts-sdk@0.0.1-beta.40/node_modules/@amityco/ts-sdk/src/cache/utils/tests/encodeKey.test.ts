import { encodeKey } from '..';

describe('cache util > encodeKey', () => {
  test('it should return encoded string', () => {
    const key = ['post', 'get', 'post-id'];
    const keyObject = { 0: 'post', 1: 'get', 2: 'post-id' };

    const expected = JSON.stringify(keyObject);

    expect(encodeKey(key)).toBe(expected);
  });

  test('it should normalize key', () => {
    const key = [{ c: 'last', b: 'middle', a: 'first' }];
    const expected = JSON.stringify({ 0: { a: 'first', b: 'middle', c: 'last' } });

    expect(encodeKey(key)).toBe(expected);
  });
});
