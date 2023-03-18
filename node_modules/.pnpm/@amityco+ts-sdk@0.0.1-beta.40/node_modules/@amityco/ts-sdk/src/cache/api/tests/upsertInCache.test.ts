import { connectClient, disconnectClient, post11, message11, channel1 } from '~/utils/tests';

import { upsertInCache, enableCache, disableCache, pullFromCache } from '..';

describe('upsertInCache', () => {
  beforeAll(connectClient);
  afterAll(() => {
    disableCache();
    disconnectClient();
  });

  const cacheKey = ['post', 'get', 'test-candidate-id'];

  test('it should add candidate to cache if non-existent', () => {
    enableCache();

    expect(upsertInCache(cacheKey, post11)).toBe(true);
    expect(pullFromCache(cacheKey)?.data).toBe(post11);

    disableCache();
  });

  test('it should return false if cache disabled', () => {
    disableCache();

    expect(upsertInCache(cacheKey, post11)).toBe(false);
  });

  test('it should update cachedAt value', () => {
    enableCache();

    const now = Date.now();

    expect(upsertInCache(cacheKey, post11, { cachedAt: now })).toBe(true);
    expect(pullFromCache(cacheKey)?.cachedAt).toBe(now);

    disableCache();
  });

  // create table of tests for message, post, channel
  const cases: [string, Amity.CacheKey, Record<string, unknown>][] = [
    ['post', ['post', 'get', post11.postId], post11],
    ['message', ['message', 'get', message11.messageId], message11],
    ['channel', ['channel', 'get', channel1.channelId], channel1],
    ['post', ['post', 'get', post11.postId], { ...post11, channelId: 'altered' }],
    ['message', ['message', 'get', message11.messageId], { ...message11, userId: 'updated-user' }],
    ['channel', ['channel', 'get', channel1.channelId], { ...channel1, displayName: 'updated' }],
  ];

  // cache is not disabled, so as to test update
  test.each(cases)('it should update %s in cache', (type, cacheKey, expected) => {
    enableCache();

    const recieved = upsertInCache(cacheKey, expected);

    expect(recieved).toBe(true);
    expect(pullFromCache(cacheKey)?.data).toBeDefined();
    expect(pullFromCache(cacheKey)?.data).toStrictEqual(expected);
  });
});
