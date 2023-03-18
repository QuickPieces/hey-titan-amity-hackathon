import {
  client,
  connectClient,
  disconnectClient,
  community11,
  emptyCommunityPayload,
} from '~/utils/tests';

import { onCommunityDeleted } from '../onCommunityDeleted';

const deletedCommunity = { ...community11, isDeleted: true };

const eventPayload: Amity.CommunityPayload = {
  ...emptyCommunityPayload,
  communities: [deletedCommunity],
};

describe('onCommunityDeleted', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after community deleted', () => {
    const callback = jest.fn();
    const unsub = onCommunityDeleted(callback);
    client.emitter.emit('community.deleted', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(deletedCommunity);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onCommunityDeleted(callback);

    unsub();

    client.emitter.emit('community.deleted', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
