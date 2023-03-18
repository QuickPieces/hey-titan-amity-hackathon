import { onPostDeleted } from '../onPostDeleted';
import { client, connectClient, disconnectClient, postPayload, post11 } from '~/utils/tests';

describe('onPostDeleted', () => {
  beforeAll(async () => {
    await connectClient();
  });

  afterAll(async () => {
    await disconnectClient();
  });

  test('it should got event after post deleted', () => {
    const callback = jest.fn();
    const unsub = onPostDeleted(callback);
    client.emitter.emit('post.deleted', postPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(post11);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onPostDeleted(callback);

    unsub();

    client.emitter.emit('post.deleted', postPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
