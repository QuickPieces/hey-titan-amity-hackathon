import { withUser } from '~/group/utils';
import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
  user11,
} from '~/utils/tests';

import { onCommunityUserRemoved } from '../onCommunityUserRemoved';

const community = community11;
const removedUserRaw = { ...communityUser11, communityMembership: 'none' as const };
const removedUser = withUser(removedUserRaw);

const eventPayload: Amity.CommunityMembershipPayload = {
  communities: [community],
  communityUsers: [removedUserRaw],
  files: [],
  users: [user11],
  categories: [],
  feeds: [],
};

describe('onCommunityUserRemoved', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after removed community user', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserRemoved(callback);
    client.emitter.emit('community.userRemoved', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(community, removedUser);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserRemoved(callback);

    unsub();

    client.emitter.emit('community.userRemoved', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
