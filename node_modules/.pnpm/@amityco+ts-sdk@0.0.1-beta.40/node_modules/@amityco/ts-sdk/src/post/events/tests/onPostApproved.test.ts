import { onPostApproved } from '../onPostApproved';
import { client, connectClient, disconnectClient, postPayload, post11 } from '~/utils/tests';

describe('onPostApproved', () => {
  beforeAll(async () => {
    await connectClient();
  });

  afterAll(async () => {
    await disconnectClient();
  });

  test('it should got event after post approved', () => {
    const callback = jest.fn();
    const unsub = onPostApproved(callback);
    client.emitter.emit('post.approved', postPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(post11);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onPostApproved(callback);

    unsub();

    client.emitter.emit('post.approved', postPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
