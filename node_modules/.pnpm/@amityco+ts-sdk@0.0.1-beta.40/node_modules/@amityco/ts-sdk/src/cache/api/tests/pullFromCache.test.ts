import { connectClient, disconnectClient, post11, message11, channel1 } from '~/utils/tests';

import { pullFromCache, enableCache, disableCache, pushToCache } from '..';

describe('pullFromCache', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should return undefined if entity not in cache', () => {
    enableCache();

    expect(pullFromCache(['post', 'get', 'non-existent-postId'])).toBeUndefined();

    disableCache();
  });

  test('it should return undefined if cache disabled', () => {
    disableCache();

    expect(pullFromCache(['post', 'get', 'post-id'])).toBeUndefined();
  });

  const cases: [string, Amity.CacheKey, unknown][] = [
    ['post', ['post', 'get', post11.postId], post11],
    ['message', ['message', 'get', message11.messageId], message11],
    ['channel', ['channel', 'get', channel1.channelId], channel1],
  ];

  test.each(cases)('it should return %s from cache', (type, cacheKey, expected) => {
    enableCache();

    pushToCache(cacheKey, expected);

    const recieved = pullFromCache(cacheKey);

    expect(recieved).toBeDefined();
    expect(recieved?.data).toBeDefined();
    expect(recieved?.data).toBe(expected);

    disableCache();
  });
});
