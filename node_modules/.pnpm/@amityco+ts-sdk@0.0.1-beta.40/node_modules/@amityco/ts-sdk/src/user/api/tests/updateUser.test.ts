import { disableCache, enableCache, pushToCache, pullFromCache } from '~/cache/api';

import { client, userUpdateResponse } from '~/utils/tests';

import { updateUser } from '../updateUser';
import { onUserUpdated } from '../../events/onUserUpdated';

describe('updateUser', () => {
  const displayName = 'updated-display-name';
  const userId = 'test-user';
  const avatarCustomUrl = 'updated-avatarUrl';

  // integration_test_id: a1a8260f-3314-41ba-9f5f-3a96dd52453d
  test('it should return updated user on success', async () => {
    const { users: expected } = userUpdateResponse.data;
    client.http.put = jest.fn().mockResolvedValue(userUpdateResponse);

    const { data: received } = await updateUser(userId, { displayName, avatarCustomUrl });

    expect(received).toStrictEqual(expected[0]);
  });

  // integration_test_id: 67cb7ad8-28a9-4950-a86c-35497bb5212c
  test('it should return 400301 when updating another user', async () => {
    client.http.put = jest.fn().mockRejectedValueOnce(new Error('400301'));

    await expect(
      updateUser('different-user', { displayName: 'updated-display-name' }),
    ).rejects.toThrow('400301');
  });

  test('it should update cache with updated user', async () => {
    enableCache();

    const expected = userUpdateResponse.data.users[0];
    pushToCache(['user', 'get', userId], { ...expected, displayName: 'old-displayName' });

    client.http.put = jest.fn().mockResolvedValue(userUpdateResponse);
    await updateUser(userId, { displayName, avatarCustomUrl });

    const received = pullFromCache(['user', 'get', userId])?.data;

    expect(received).toStrictEqual(expected);
    disableCache();
  });

  test('it should fire event for updated user', async () => {
    let dispose;
    const { users: expected } = userUpdateResponse.data;
    client.http.put = jest.fn().mockResolvedValue(userUpdateResponse);

    const callbackPromise = new Promise(resolve => {
      dispose = onUserUpdated(resolve);
    }).finally(dispose);

    await updateUser(userId, { displayName, avatarCustomUrl });

    await expect(callbackPromise).resolves.toEqual(expect.objectContaining(expected[0]));
  });
});
