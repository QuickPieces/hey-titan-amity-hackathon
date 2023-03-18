import { disableCache, enableCache, pullFromCache } from '~/cache/api';

import { client, community11, communityUser11 } from '~/utils/tests';

import { onCommunityCreated } from '../../events';
import { createCommunity } from '../createCommunity';

const communityToCreate = community11;
const { communityId: createId, ...payload } = communityToCreate;

const resolvedPostValue = {
  data: {
    communities: [communityToCreate],
    communityUsers: [communityUser11],
    files: [],
    users: [],
    categories: [],
    feeds: [],
  },
};

describe('createCommunity', () => {
  test('should return created community', async () => {
    client.http.post = jest.fn().mockResolvedValue(resolvedPostValue);

    const recieved = createCommunity(payload);

    await expect(recieved).resolves.toEqual(expect.objectContaining({ data: communityToCreate }));
  });

  test('should throw an error if request fails', async () => {
    client.http.post = jest.fn().mockRejectedValueOnce(new Error('error'));

    await expect(createCommunity(payload)).rejects.toThrow('error');
  });

  test('should create cache after created community', async () => {
    enableCache();
    client.http.post = jest.fn().mockResolvedValue(resolvedPostValue);

    await createCommunity(payload);
    const recieved = pullFromCache(['community', 'get', createId])?.data;

    expect(recieved).toEqual(expect.objectContaining(communityToCreate));

    disableCache();
  });

  test('should fire event `onCommunityCreated`', async () => {
    let dispose;
    client.http.post = jest.fn().mockResolvedValueOnce(resolvedPostValue);

    const callbackPromise = new Promise(resolve => {
      dispose = onCommunityCreated(resolve);
    }).finally(dispose);

    await createCommunity(payload);

    await expect(callbackPromise).resolves.toEqual(expect.objectContaining(communityToCreate));
  });
});
