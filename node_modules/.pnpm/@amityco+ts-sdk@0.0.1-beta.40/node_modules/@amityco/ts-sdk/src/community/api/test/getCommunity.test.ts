import { disableCache, enableCache, pullFromCache, pushToCache } from '~/cache/api';
import { client, community11 } from '~/utils/tests';

import { getCommunity } from '../getCommunity';

const communityToGet = community11;
const getId = community11.communityId;

const resolvedGetValue = {
  data: {
    communities: [communityToGet],
    communityUsers: [community11],
    files: [],
    users: [],
    categories: [],
    feeds: [],
  },
};

describe('getCommunity', () => {
  test('should return fetched community', async () => {
    client.http.get = jest.fn().mockResolvedValueOnce(resolvedGetValue);

    await expect(getCommunity(getId)).resolves.toEqual(
      expect.objectContaining({ data: communityToGet }),
    );
  });

  test('should update cache after fetching community', async () => {
    enableCache();
    client.http.get = jest.fn().mockResolvedValue(resolvedGetValue);

    await getCommunity(getId);

    const recieved = pullFromCache(['community', 'get', getId])?.data;

    expect(recieved).toEqual(communityToGet);

    disableCache();
  });

  test('should throw an error if request fails', async () => {
    client.http.get = jest.fn().mockRejectedValueOnce(new Error('error'));

    await expect(getCommunity(getId)).rejects.toThrow('error');
  });
});

describe('getCommunity.locally', () => {
  beforeEach(() => enableCache());
  afterEach(() => disableCache());

  test('should return cached community', () => {
    pushToCache(['community', 'get', getId], communityToGet);

    expect(getCommunity.locally(getId)?.data).toEqual(communityToGet);
  });

  test('it should return undefined if community not in cache', () => {
    expect(getCommunity.locally('non-existent-community')).toBeUndefined();
  });

  test('should return undefined if cache not enabled', () => {
    disableCache();
    pushToCache(['community', 'get', getId], communityToGet);

    expect(getCommunity.locally(getId)).toBeUndefined();
  });
});
