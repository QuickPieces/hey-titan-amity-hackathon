import { disableCache, enableCache, pullFromCache, pushToCache } from '~/cache/api';
import { client, community11, communityUser11, user11 } from '~/utils/tests';

import { deleteCommunity } from '../deleteCommunity';
import { onCommunityDeleted } from '../../events';

const communityToDelete = community11;
const { communityId: deleteId } = communityToDelete;
const deletedCommunity = { ...communityToDelete, isDeleted: true };
const { updatedAt, ...deletedCommunityWithoutTS } = deletedCommunity;

const resolvedDeleteValue = {
  data: {
    success: true,
  },
};

const resolvedGetValue = {
  data: {
    communities: [deletedCommunity],
    communityUsers: [communityUser11],
    files: [],
    users: [user11],
    categories: [],
    feeds: [],
  },
};

describe('deleteCommunity', () => {
  test('should return deleted community', async () => {
    client.http.delete = jest.fn().mockResolvedValueOnce(resolvedDeleteValue);
    client.http.get = jest.fn().mockResolvedValueOnce(resolvedGetValue);

    await expect(deleteCommunity(deleteId)).resolves.toEqual(
      expect.objectContaining(deletedCommunityWithoutTS),
    );
  });

  test('should throw an error if request fails', async () => {
    client.http.delete = jest.fn().mockRejectedValueOnce(new Error('error'));

    await expect(deleteCommunity(deleteId)).rejects.toThrow('error');
  });

  test('should update cache after deleted community', async () => {
    enableCache();
    client.http.delete = jest.fn().mockResolvedValueOnce(resolvedDeleteValue);
    client.http.get = jest.fn().mockResolvedValueOnce(resolvedGetValue);
    pushToCache(['community', 'get', deleteId], communityToDelete);

    await deleteCommunity(deleteId);
    const recieved = pullFromCache(['community', 'get', deleteId])?.data;

    expect(recieved).toEqual(expect.objectContaining(deletedCommunityWithoutTS));

    disableCache();
  });

  test('should fire event `onCommunityDeleted`', async () => {
    let dispose;
    client.http.delete = jest.fn().mockResolvedValueOnce(resolvedDeleteValue);
    client.http.get = jest.fn().mockResolvedValueOnce(resolvedGetValue);

    const callbackPromise = new Promise(resolve => {
      dispose = onCommunityDeleted(resolve);
    }).finally(dispose);

    await deleteCommunity(deleteId);

    await expect(callbackPromise).resolves.toEqual(
      expect.objectContaining(deletedCommunityWithoutTS),
    );
  });
});
