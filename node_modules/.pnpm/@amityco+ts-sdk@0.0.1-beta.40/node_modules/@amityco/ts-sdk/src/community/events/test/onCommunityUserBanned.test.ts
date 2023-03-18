import { withUser } from '~/group/utils';
import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
  user11,
} from '~/utils/tests';

import { onCommunityUserBanned } from '../onCommunityUserBanned';

const community = community11;
const banedUserRaw = { ...communityUser11, communityMembership: 'banned' as const };
const banedUser = withUser(banedUserRaw);

const eventPayload: Amity.CommunityMembershipPayload = {
  communities: [community],
  communityUsers: [banedUserRaw],
  files: [],
  users: [user11],
  categories: [],
  feeds: [],
};

describe('onCommunityUserBanned', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after banned community user', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserBanned(callback);
    client.emitter.emit('community.userBanned', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith({ ...community, isJoined: true }, banedUser);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserBanned(callback);

    unsub();

    client.emitter.emit('community.userBanned', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
