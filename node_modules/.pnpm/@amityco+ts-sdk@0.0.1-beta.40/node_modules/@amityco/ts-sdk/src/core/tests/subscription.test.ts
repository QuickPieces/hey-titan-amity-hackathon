import { ASCUnknownError } from '~/core/errors';
import { connectClient, disconnectClient, client } from '~/utils/tests';

import { getChannelTopic, getMessageTopic, subscribeTopic } from '../subscription';

describe('getTopic', () => {
  test('should generate channel topic', () => {
    const channel = { path: 'channel-path' };

    expect(getChannelTopic(channel)).toEqual('channel-path/#');
  });

  test('should generate channel topic', () => {
    const message = { path: 'message-path' };

    expect(getMessageTopic(message)).toEqual('message-path');
  });
});

describe('subscription', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  const channel = { path: 'channel-path' };

  // integration_test_id: cb1b5450-b131-4a00-9c47-aad26f415b20
  test('it should return succesfull result for valid topic', () => {
    client.mqtt.subscribe = jest.fn().mockImplementation(() => () => null);

    const recieved = subscribeTopic(getChannelTopic(channel), () => null);

    expect(recieved).toBeTruthy();
  });

  // integration_test_id: 09db1790-08e1-43d2-a674-866c5dd3c75c
  test('it should return 800000 for subscribing to invalid topid', () => {
    const expected = new ASCUnknownError(Amity.ClientError.UNKNOWN_ERROR, Amity.ErrorLevel.ERROR);
    client.mqtt.subscribe = jest.fn().mockImplementation(() => () => {
      throw expected;
    });

    try {
      subscribeTopic('invalid topic', () => null);
    } catch (error) {
      expect(error).toEqual(expected);
    }
  });

  test('it should call mqtt connect if accesstoken does not match', () => {
    const callback = jest.fn();

    client.token = { accessToken: '', issuedAt: '', expiresAt: '' };
    client.mqtt.connect = callback;

    subscribeTopic(getChannelTopic(channel), () => null);

    expect(callback).toHaveBeenCalled();
  });
});

describe('unsubsribe', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  const channel = { path: 'channel-path' };

  // integration_test_id: 87978499-5f4e-4a36-a092-56dde566329a
  test('it should succesfully call unsubsribe', () => {
    client.mqtt.unsubscribe = jest.fn().mockImplementation(() => true);
    client.mqtt.subscribe = jest.fn().mockImplementation(() => client.mqtt.unsubscribe);

    const recieved = subscribeTopic(getChannelTopic(channel), () => null);

    expect(recieved()).toEqual(true);
  });

  // integration_test_id: 8d444682-453d-44f8-b8c1-8c282e7db4bc
  test('it should throw error', () => {
    const expected = new ASCUnknownError(Amity.ClientError.UNKNOWN_ERROR, Amity.ErrorLevel.ERROR);
    client.mqtt.unsubscribe = jest.fn().mockImplementation(() => {
      throw expected;
    });
    client.mqtt.subscribe = jest.fn().mockImplementation(() => client.mqtt.unsubscribe);

    try {
      const recieved = subscribeTopic('invalid topic', () => null);

      recieved();
    } catch (error) {
      expect(error).toEqual(expected);
    }
  });
});
