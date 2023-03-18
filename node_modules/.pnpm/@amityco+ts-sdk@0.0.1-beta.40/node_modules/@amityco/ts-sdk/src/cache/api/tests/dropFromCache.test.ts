import {
  connectClient,
  disconnectClient,
  post11,
  channel1,
  message11,
  user14,
  channelPayload,
} from '~/utils/tests';

import { dropFromCache, enableCache, disableCache, pushToCache, pullFromCache } from '..';
import { ingestInCache } from '../ingestInCache';

describe('dropFromCache', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  beforeEach(enableCache);
  afterEach(disableCache);

  test('it should return false if cache disabled', () => {
    disableCache();

    expect(dropFromCache(['post', 'get', 'postId'])).toBe(false);
  });

  test('it should return false if candidate not in cache', () => {
    expect(dropFromCache(['post', 'get', 'non-existent-postId'], true)).toBe(false);
  });

  test('it should delete multiple matches when exact:false', () => {
    ingestInCache(channelPayload);

    const recieved = dropFromCache(['user', 'get', user14.userId]);

    expect(recieved).toBe(true);
    expect(pullFromCache(['user', 'get', user14.userId])).toBeUndefined();
  });

  const cases: [string, boolean, Amity.CacheKey, unknown][] = [
    ['post', false, ['post', 'get', post11.postId], post11],
    ['message', false, ['message', 'get', message11.messageId], message11],
    ['channel', false, ['channel', 'get', channel1.channelId], channel1],
    ['post', true, ['post', 'get', post11.postId], post11],
    ['message', true, ['message', 'get', message11.messageId], message11],
    ['channel', true, ['channel', 'get', channel1.channelId], channel1],
  ];

  test.each(cases)(
    'it should delete %s from cache when exact:%s',
    (candidate, exact, cacheKey, expected) => {
      pushToCache(cacheKey, expected);
      const recieved = dropFromCache(cacheKey, exact);

      expect(recieved).toBe(true);
      expect(pullFromCache(cacheKey)).toBeUndefined();
    },
  );
});
