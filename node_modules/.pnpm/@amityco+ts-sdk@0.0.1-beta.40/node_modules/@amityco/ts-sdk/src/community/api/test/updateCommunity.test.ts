import { disableCache, enableCache, pullFromCache } from '~/cache/api';
import { client, community11, communityUser11, user11 } from '~/utils/tests';

import { updateCommunity } from '../updateCommunity';
import { onCommunityUpdated } from '../../events';

const communityToUpdate = community11;
const patch = { displayName: 'new-display-name' };
const updatedCommunity = { ...communityToUpdate, ...patch };

const resolvedPutValue = {
  data: {
    communities: [updatedCommunity],
    communityUsers: [communityUser11],
    files: [],
    users: [user11],
    categories: [],
    feeds: [],
  },
};

describe('updateCommunity', () => {
  test('should return updated community', async () => {
    client.http.put = jest.fn().mockResolvedValueOnce(resolvedPutValue);

    const recieved = updateCommunity(communityToUpdate.communityId, patch);

    await expect(recieved).resolves.toEqual(expect.objectContaining({ data: updatedCommunity }));
  });

  test('should throw an error if request fails', async () => {
    client.http.put = jest.fn().mockRejectedValueOnce(new Error('error'));

    await expect(updateCommunity(communityToUpdate.communityId, patch)).rejects.toThrow('error');
  });

  test('should update cache after updated community', async () => {
    enableCache();
    client.http.put = jest.fn().mockResolvedValueOnce(resolvedPutValue);

    await updateCommunity(communityToUpdate.communityId, patch);
    const recieved = pullFromCache<Amity.Community>([
      'community',
      'get',
      communityToUpdate.communityId,
    ])?.data;

    expect(recieved).toEqual(expect.objectContaining(updatedCommunity));

    disableCache();
  });

  test('should fire event `onCommunityUpdated`', async () => {
    let dispose;
    client.http.put = jest.fn().mockResolvedValueOnce(resolvedPutValue);

    const callbackPromise = new Promise(resolve => {
      dispose = onCommunityUpdated(resolve);
    }).finally(dispose);

    await updateCommunity(updatedCommunity.communityId, patch);

    await expect(callbackPromise).resolves.toEqual(expect.objectContaining(updatedCommunity));
  });
});
