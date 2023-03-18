import { disableCache, enableCache, pullFromCache, pushToCache } from '~/cache/api';
import { client, community11, community21 } from '~/utils/tests';

import { getCommunities } from '../getCommunities';

const communitiesToGet = [community11, community21];
const getIds = communitiesToGet.map(({ communityId }) => communityId);

const resolvedGetValue = {
  data: {
    communities: communitiesToGet,
    communityUsers: [community11, community21],
    files: [],
    users: [],
    categories: [],
    feeds: [],
  },
};

describe('getCommunities', () => {
  test('should return fetched communities', async () => {
    client.http.get = jest.fn().mockResolvedValueOnce(resolvedGetValue);

    await expect(getCommunities(getIds)).resolves.toEqual(
      expect.objectContaining({ data: communitiesToGet }),
    );
  });

  test('should update cache after fetching communities', async () => {
    enableCache();
    client.http.get = jest.fn().mockResolvedValue(resolvedGetValue);

    await getCommunities(getIds);

    const recieved = getIds.map(id => pullFromCache(['community', 'get', id])?.data);

    expect(recieved).toEqual(communitiesToGet);

    disableCache();
  });

  test('should throw an error if request fails', async () => {
    client.http.get = jest.fn().mockRejectedValueOnce(new Error('error'));

    await expect(getCommunities(getIds)).rejects.toThrow('error');
  });
});

describe('getCommunities.locally', () => {
  beforeEach(() => enableCache());
  afterEach(() => disableCache());

  test('should return cached communities', () => {
    communitiesToGet.forEach(community =>
      pushToCache(['community', 'get', community.communityId], community),
    );

    expect(getCommunities.locally(getIds)?.data).toEqual(communitiesToGet);
  });

  test('it should return undefined if communities not in cache', () => {
    expect(getCommunities.locally(['non-existent-communities'])).toBeUndefined();
  });

  test('should return undefined if cache not enabled', () => {
    disableCache();
    communitiesToGet.forEach(community =>
      pushToCache(['community', 'get', community.communityId], community),
    );

    expect(getCommunities.locally(getIds)).toBeUndefined();
  });
});
