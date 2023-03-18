import { partialMatch } from '..';

import { post11, post12 } from '~/utils/tests';

describe('cache util > partialMatch', () => {
  test('it should return true if objects are deep equal', () => {
    expect(partialMatch(post11, post11)).toBe(true);
  });

  test('it should return false if objects are not deep equal', () => {
    expect(partialMatch(post11, post12)).toBe(false);
  });
});
