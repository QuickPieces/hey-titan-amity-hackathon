import { onPostCreated } from '../onPostCreated';
import { client, connectClient, disconnectClient, postPayload, post11 } from '~/utils/tests';

describe('onPostCreated', () => {
  beforeAll(async () => {
    await connectClient();
  });

  afterAll(async () => {
    await disconnectClient();
  });

  test('it should got event after post created', () => {
    const callback = jest.fn();
    const unsub = onPostCreated(callback);
    client.emitter.emit('post.created', postPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(post11);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onPostCreated(callback);

    unsub();

    client.emitter.emit('post.created', postPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
