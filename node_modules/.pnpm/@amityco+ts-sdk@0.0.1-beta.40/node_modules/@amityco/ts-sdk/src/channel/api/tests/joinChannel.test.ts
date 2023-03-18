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

import { joinChannel } from '../joinChannel';

describe('joinChannel', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  const { channelId } = channel1;

  // integration_test_id: efef33a8-bf09-4dfe-8ed9-e7c3615ad74d
  test('it should return channelUser', async () => {
    client.http.post = jest.fn().mockResolvedValueOnce(channelUserQueryResponse);

    const recieved = await joinChannel(channelId);

    expect(recieved).toBe(true);
  });

  test('it should update cache', async () => {
    enableCache();

    const expected = channelUser;
    client.http.post = jest.fn().mockResolvedValueOnce(channelUserQueryResponse);

    const didJoinChannel = await joinChannel(channelId);

    const resolverId = getResolver('channelUsers')({ channelId, userId: user11.userId });
    const recieved = pullFromCache(['channelUsers', 'get', resolverId]);

    expect(didJoinChannel).toBe(true);
    expect(recieved?.data).toStrictEqual(expected);

    disableCache();
  });

  // integration_test_id: 402a8cd8-6522-42d0-8f40-ccccae0093a1
  test('it should throw error 400400 when user joins channel which does not exist', async () => {
    const apiError = new ASCApiError(
      'ChannelId Not Found',
      Amity.ServerError.ITEM_NOT_FOUND,
      Amity.ErrorLevel.ERROR,
    );

    client.http.post = jest.fn().mockRejectedValueOnce({
      status: 403,
      data: apiError,
    });

    try {
      await joinChannel(channelId);
    } catch ({ status = null, data = null }) {
      expect(status).toEqual(403);
      expect(data).toEqual(apiError);
    }
  });

  // integration_test_id: dcad7f35-586c-400f-8eca-2334d6d7b3e0
  test("it should throw error 400300 when user tries to join channel in which he doesn't have permission", async () => {
    const apiError = new ASCApiError(
      "Can't join the conversation channel",
      Amity.ServerError.FORBIDDEN,
      Amity.ErrorLevel.ERROR,
    );

    client.http.post = jest.fn().mockRejectedValueOnce({
      status: 403,
      data: apiError,
    });

    try {
      await joinChannel(channelId);
    } catch ({ status = null, data = null }) {
      expect(status).toEqual(403);
      expect(data).toEqual(apiError);
    }
  });

  // integration_test_id: 8ccb81b7-a89c-486a-81ed-7371b3ef1c4f
  test('it should throw error 400304 when user tries to join channel in which he is banned', async () => {
    const apiError = new ASCApiError(
      'User is banned from this channel',
      Amity.ServerError.CHANNEL_BAN,
      Amity.ErrorLevel.ERROR,
    );

    client.http.post = jest.fn().mockRejectedValueOnce({
      status: 403,
      data: apiError,
    });

    try {
      await joinChannel(channelId);
    } catch ({ status = null, data = null }) {
      expect(status).toEqual(403);
      expect(data).toEqual(apiError);
    }
  });
});
