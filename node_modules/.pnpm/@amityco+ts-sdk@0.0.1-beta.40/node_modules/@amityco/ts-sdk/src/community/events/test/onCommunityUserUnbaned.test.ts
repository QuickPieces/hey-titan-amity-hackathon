import { withUser } from '~/group/utils';
import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
  user11,
} from '~/utils/tests';

import { onCommunityUserUnbanned } from '../onCommunityUserUnbanned';

const community = community11;
const unbannedUserRaw = { ...communityUser11, communityMembership: 'member' as const };
const unbannedUser = withUser(unbannedUserRaw);

const eventPayload: Amity.CommunityMembershipPayload = {
  communities: [community],
  communityUsers: [unbannedUserRaw],
  files: [],
  users: [user11],
  categories: [],
  feeds: [],
};

describe('onCommunityUserUnbanned', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after unbanned community user', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserUnbanned(callback);
    client.emitter.emit('community.userUnbanned', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith({ ...community, isJoined: true }, unbannedUser);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserUnbanned(callback);

    unsub();

    client.emitter.emit('community.userUnbanned', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
