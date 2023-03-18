import { onPostFlagged } from '../onPostFlagged';
import { client, connectClient, disconnectClient, postPayload, post11 } from '~/utils/tests';

describe('onPostFlagged', () => {
  beforeAll(async () => {
    await connectClient();
  });

  afterAll(async () => {
    await disconnectClient();
  });

  test('it should got event after post flagged', () => {
    const callback = jest.fn();
    const unsub = onPostFlagged(callback);
    client.emitter.emit('post.flagged', postPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(post11);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onPostFlagged(callback);

    unsub();

    client.emitter.emit('post.flagged', postPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
