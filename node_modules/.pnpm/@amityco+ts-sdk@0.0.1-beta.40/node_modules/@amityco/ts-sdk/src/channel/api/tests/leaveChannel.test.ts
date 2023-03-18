import { pullFromCache, enableCache, disableCache } from '~/cache/api';
import { ASCApiError } from '~/core/errors';
import { getResolver } from '~/core/model';

import {
  client,
  connectClient,
  disconnectClient,
  channel1,
  user11,
  channelUserQueryResponse,
  channelUser,
} from '~/utils/tests';

import { leaveChannel } from '../leaveChannel';

describe('leaveChannel', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  const { channelId } = channel1;

  // integration_test_id: 3b4408dd-0f45-4270-9384-73d9ddac4511
  test('it should return channelUser', async () => {
    client.http.delete = jest.fn().mockResolvedValueOnce(channelUserQueryResponse);

    const recieved = await leaveChannel(channelId);

    expect(recieved).toBe(true);
  });

  test('it should update cache', async () => {
    enableCache();

    const expected = channelUser;
    client.http.delete = jest.fn().mockResolvedValueOnce(channelUserQueryResponse);

    const didleaveChannel = await leaveChannel(channelId);

    const resolverId = getResolver('channelUsers')({ channelId, userId: user11.userId });
    const recieved = pullFromCache(['channelUsers', 'get', resolverId]);

    expect(didleaveChannel).toBe(true);
    expect(recieved?.data).toStrictEqual(expected);

    disableCache();
  });

  // integration_test_id: 4f56790e-5fa0-4d04-8c20-ab0c39d0776f
  test('it should throw error 400301 when user try to leave a channel which user is not a member', async () => {
    const apiError = new ASCApiError(
      'User is not member of channel',
      Amity.ServerError.PERMISSION_DENIED,
      Amity.ErrorLevel.ERROR,
    );

    client.http.delete = jest.fn().mockRejectedValueOnce({
      status: 403,
      data: apiError,
    });

    try {
      await leaveChannel(channelId);
    } catch ({ status = null, data = null }) {
      expect(status).toEqual(403);
      expect(data).toEqual(apiError);
    }
  });

  // integration_test_id: 818d2317-e138-4d66-bdc0-bcc858580df5
  test('it should throw error 400304 when user try to leave channel which he got banned', async () => {
    const apiError = new ASCApiError(
      'User is banned from this channel',
      Amity.ServerError.CHANNEL_BAN,
      Amity.ErrorLevel.ERROR,
    );

    client.http.delete = jest.fn().mockRejectedValueOnce({
      status: 403,
      data: apiError,
    });

    try {
      await leaveChannel(channelId);
    } catch ({ status = null, data = null }) {
      expect(status).toEqual(403);
      expect(data).toEqual(apiError);
    }
  });
});
