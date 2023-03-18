import { getActiveClient } from '~/client/api';
import { connectClient, disconnectClient, user11 } from '~/utils/tests';

import { pushToCache, enableCache, disableCache, pullFromCache } from '..';
import { encodeKey } from '../../utils';

describe('pushToCache', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  describe('- cache enabled', () => {
    beforeEach(enableCache);
    afterEach(disableCache);

    const cacheKey = ['user', 'get', user11.userId];

    test('it should return true if data added to cache', () => {
      const recieved = pushToCache(cacheKey, user11);

      expect(recieved).toBe(true);
    });

    test('it should add data to cache', () => {
      const returned = pushToCache(cacheKey, user11);
      const recieved = pullFromCache(cacheKey)?.data;

      expect(returned).toBe(true);
      expect(recieved).toBe(user11);
    });

    test('it should persist data offline', () => {
      const { cache } = getActiveClient();
      const encodedKey = encodeKey(cacheKey);
      const options = { offline: true, cachedAt: Date.now() };

      const addedUser = pushToCache(cacheKey, user11, options);

      const expected = {
        key: cacheKey,
        data: user11,
        ...options,
      };
      const recieved = cache?.data[encodedKey];

      expect(addedUser).toBe(true);
      expect(recieved).toStrictEqual(expected);
    });
  });

  describe('- no cache', () => {
    test('it should return false if no cache', () => {
      const recieved = pushToCache(['model', 'key', 'modleId'], {});

      expect(recieved).toBe(false);
    });
  });
});
