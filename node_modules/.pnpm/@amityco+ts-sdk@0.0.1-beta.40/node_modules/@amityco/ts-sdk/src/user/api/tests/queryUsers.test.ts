import { getResolver } from '~/core/model';

import { disableCache, enableCache, pushToCache } from '~/cache/api';
import { ingestInCache } from '~/cache/api/ingestInCache';

import { client, userQueryResponse } from '~/utils/tests';

import { queryUsers } from '../queryUsers';

describe('queryUsers', () => {
  test('it should return users', async () => {
    const { users: expected } = userQueryResponse.data;
    client.http.get = jest.fn().mockResolvedValue(userQueryResponse);

    const { data } = await queryUsers();

    expect(data).toEqual(expected);
  });

  test('it should throw error', async () => {
    client.http.get = jest.fn().mockRejectedValueOnce(new Error('error'));

    await expect(queryUsers()).rejects.toThrow('error');
  });

  test('it should update cache upon fetching data from server', async () => {
    enableCache();

    client.http.get = jest.fn().mockResolvedValue(userQueryResponse);

    const { data: expected } = await queryUsers();
    const { data: received } = queryUsers.locally()!;

    expect(received).toBeDefined();
    expect(received).toEqual(expected);

    disableCache();
  });
});

describe('queryUsers.locally', () => {
  const cacheKey = [
    'user',
    'query',
    { options: { limit: 10, after: undefined } } as Amity.Serializable,
  ];

  test('it should fetch query locally if present in cache', () => {
    enableCache();

    const { data } = userQueryResponse;
    const { users: expected, paging } = data;

    ingestInCache(data as Amity.UserPayload);

    pushToCache(cacheKey, { users: expected.map(getResolver('user')), paging });

    const { data: received } = queryUsers.locally()!;

    expect(received).toBeDefined();
    expect(received).toEqual(expected);

    disableCache();
  });

  test('it should return undefined if only partial data in cache', () => {
    enableCache();

    const { data } = userQueryResponse;
    const { users, paging } = data;

    // ingest incomplete data
    ingestInCache({
      ...data,
      users: [data.users[0]],
    } as Amity.UserPayload);

    pushToCache(cacheKey, {
      users: users.map(getResolver('user')),
      paging,
    });

    const received = queryUsers.locally()!;

    expect(received).toBeUndefined();

    disableCache();
  });

  // added because of comment above cache key in queryUsers
  test('it should return undefined if params do not match', () => {
    enableCache();

    const { data } = userQueryResponse;
    const { users: expected, paging } = data;

    ingestInCache(data as Amity.UserPayload);

    pushToCache(cacheKey, { users: expected.map(getResolver('user')), paging });

    const { data: received } = queryUsers.locally()!;
    const received2 = queryUsers.locally({ displayName: 'test' })!;

    expect(received).toBeDefined();
    expect(received).toEqual(expected);
    expect(received2).toBeUndefined();

    disableCache();
  });

  test('it should return undefined if data not in cache', () => {
    enableCache();

    const received = queryUsers.locally();

    expect(received).toBeUndefined();

    disableCache();
  });

  test('it should return undefined if cache disabled', () => {
    expect(queryUsers.locally()).toBeUndefined();
  });
});
