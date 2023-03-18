import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
} from '~/utils/tests';

import { onCommunityCreated } from '../onCommunityCreated';

const communityToCreate = community11;

const eventPayload: Amity.CommunityPayload = {
  communities: [communityToCreate],
  communityUsers: [communityUser11],
  files: [],
  users: [],
  categories: [],
  feeds: [],
};

describe('onCommunityCreated', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after community created', () => {
    const callback = jest.fn();
    const unsub = onCommunityCreated(callback);
    client.emitter.emit('community.created', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(communityToCreate);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onCommunityCreated(callback);

    unsub();

    client.emitter.emit('community.created', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
