import { onPostUnflagged } from '../onPostUnflagged';
import { client, connectClient, disconnectClient, postPayload, post11 } from '~/utils/tests';

describe('onPostUnflagged', () => {
  beforeAll(async () => {
    await connectClient();
  });

  afterAll(async () => {
    await disconnectClient();
  });

  test('it should got event after post unflagged', () => {
    const callback = jest.fn();
    const unsub = onPostUnflagged(callback);
    client.emitter.emit('post.unflagged', postPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(post11);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onPostUnflagged(callback);

    unsub();

    client.emitter.emit('post.unflagged', postPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
