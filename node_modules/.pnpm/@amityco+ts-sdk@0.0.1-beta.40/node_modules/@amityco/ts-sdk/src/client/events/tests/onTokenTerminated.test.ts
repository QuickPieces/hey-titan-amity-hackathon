import { client, connectClient, disconnectClient } from '~/utils/tests';

import { onTokenTerminated } from '../onTokenTerminated';

describe('onTokenTerminated', () => {
  beforeAll(async () => {
    await connectClient();
  });

  afterAll(async () => {
    await disconnectClient();
  });

  test('it should call callback on event', () => {
    const callback = jest.fn();
    const expected = Amity.SessionStates.TERMINATED;

    const unsub = onTokenTerminated(callback);
    client.emitter.emit('tokenTerminated', expected);

    expect(callback).toHaveBeenCalledWith(expected);

    unsub();
  });

  test('it should not call callback if unsubscribed', () => {
    const callback = jest.fn();
    const state = Amity.SessionStates.TERMINATED;

    const unsub = onTokenTerminated(callback);
    unsub();

    client.emitter.emit('tokenTerminated', state);

    expect(callback).not.toHaveBeenCalled();
  });
});
