import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
  user11,
} from '~/utils/tests';

import { onCommunityUpdated } from '../onCommunityUpdated';

const communityToUpdate = community11;
const patch = { displayName: 'new-display-name' };
const updatedCommunity = { ...communityToUpdate, ...patch };

const eventPayload: Amity.CommunityPayload = {
  communities: [updatedCommunity],
  communityUsers: [communityUser11],
  files: [],
  users: [user11],
  categories: [],
  feeds: [],
};

describe('onCommunityUpdated', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after community updated', () => {
    const callback = jest.fn();
    const unsub = onCommunityUpdated(callback);
    client.emitter.emit('community.updated', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(updatedCommunity);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onCommunityUpdated(callback);

    unsub();

    client.emitter.emit('community.updated', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
