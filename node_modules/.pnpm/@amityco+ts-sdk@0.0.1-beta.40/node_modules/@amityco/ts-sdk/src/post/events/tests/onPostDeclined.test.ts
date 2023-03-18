import { onPostDeclined } from '../onPostDeclined';
import { client, connectClient, disconnectClient, postPayload, post11 } from '~/utils/tests';

describe('onPostDeclined', () => {
  beforeAll(async () => {
    await connectClient();
  });

  afterAll(async () => {
    await disconnectClient();
  });

  test('it should got event after post declined', () => {
    const callback = jest.fn();
    const unsub = onPostDeclined(callback);
    client.emitter.emit('post.declined', postPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(post11);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onPostDeclined(callback);

    unsub();

    client.emitter.emit('post.declined', postPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
