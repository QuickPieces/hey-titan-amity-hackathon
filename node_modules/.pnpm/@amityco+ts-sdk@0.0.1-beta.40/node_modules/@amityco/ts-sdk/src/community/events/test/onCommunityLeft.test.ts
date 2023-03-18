import { withUser } from '~/group/utils';
import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
  user11,
} from '~/utils/tests';

import { onCommunityLeft } from '../onCommunityLeft';

const communityToLeave = community11;
const leavedUserRaw = { ...communityUser11, communityMembership: 'none' as const };
const leavedUser = withUser(leavedUserRaw);

const eventPayload: Amity.CommunityMembershipPayload = {
  communities: [communityToLeave],
  communityUsers: [leavedUserRaw],
  files: [],
  users: [user11],
  categories: [],
  feeds: [],
};

describe('onCommunityLeft', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after left community', () => {
    const callback = jest.fn();
    const unsub = onCommunityLeft(callback);
    client.emitter.emit('community.left', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith(communityToLeave, leavedUser);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onCommunityLeft(callback);

    unsub();

    client.emitter.emit('community.left', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
