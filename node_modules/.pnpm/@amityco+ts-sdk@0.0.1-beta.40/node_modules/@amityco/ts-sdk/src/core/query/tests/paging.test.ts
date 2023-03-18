import { toPage, isSkip, isAfterBefore } from '../paging';

describe('paging', () => {
  const skipToken = 'eyJza2lwIjoiMTAiLCJsaW1pdCI6IjEwIn0=';
  const afterToken = 'eyJhZnRlciI6InRlc3QtdG9rZW4iLCJsaW1pdCI6Mn0=';
  const beforeToken =
    'eyJiZWZvcmUiOiI2M2Y0NzFjZmI2MTQzOTExZjFkMWUwNmYiLCJsaW1pdCI6Miwic2VnbWVudCI6Nn0=';

  describe('toPage', () => {
    test('it should return expected response for skip paging token', () => {
      const expected = { after: '10', limit: '10' };

      expect(toPage(skipToken)).toStrictEqual(expected);
    });

    test('it should return appropriate response for "before" paging token', () => {
      const expected = {
        before: '63f471cfb6143911f1d1e06f',
        limit: undefined,
      };

      expect(toPage(beforeToken)).toStrictEqual(expected);
    });

    test('it should return appropriate response for "after" paging token', () => {
      const expected = {
        after: 'test-token',
        limit: undefined,
      };

      expect(toPage(afterToken)).toStrictEqual(expected);
    });
  });

  describe('isSkip', () => {
    test('it should return true if skip prop in object', () => {
      expect(isSkip({ skip: 10 })).toBe(true);
    });

    test('it should return true if skip prop not in object', () => {
      expect(isSkip({ limit: 10 })).toBe(false);
    });
  });

  describe('isAfterBefore', () => {
    test('it should return true if after prop in object', () => {
      expect(isAfterBefore({ after: '' })).toBe(true);
    });

    test('it should return true if before prop in object', () => {
      expect(isAfterBefore({ before: '' })).toBe(true);
    });

    test('it should return true if first prop in object', () => {
      expect(isAfterBefore({ first: '' })).toBe(true);
    });

    test('it should return true if last prop in object', () => {
      expect(isAfterBefore({ last: '' })).toBe(true);
    });

    test('it should return false if skip prop in object', () => {
      expect(isAfterBefore({ skip: '' })).toBe(false);
    });
  });
});
