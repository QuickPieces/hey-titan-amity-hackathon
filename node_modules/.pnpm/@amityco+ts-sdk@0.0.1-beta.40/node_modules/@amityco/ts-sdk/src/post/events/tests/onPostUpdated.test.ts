import { onPostUpdated } from '../onPostUpdated';
import { client, connectClient, disconnectClient, postPayload, post11 } from '~/utils/tests';

describe('onPostUpdated', () => {
  beforeAll(async () => {
    await connectClient();
  });

  afterAll(async () => {
    await disconnectClient();
  });

  test('it should got event after post updated', () => {
    const callback = jest.fn();
    const unsub = onPostUpdated(callback);
    client.emitter.emit('post.updated', postPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(post11);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onPostUpdated(callback);

    unsub();

    client.emitter.emit('post.updated', postPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
