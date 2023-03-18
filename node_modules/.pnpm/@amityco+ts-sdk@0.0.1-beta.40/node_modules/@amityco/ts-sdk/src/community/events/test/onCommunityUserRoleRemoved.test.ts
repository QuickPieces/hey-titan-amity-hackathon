import { withUser } from '~/group/utils';
import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
  user11,
} from '~/utils/tests';

import { onCommunityUserRoleRemoved } from '../onCommunityUserRoleRemoved';

const community = community11;
const userWithoutRoleRaw = { ...communityUser11, role: [''] };
const userWithoutRole = withUser(userWithoutRoleRaw);

const eventPayload: Amity.CommunityMembershipPayload = {
  communities: [community],
  communityUsers: [userWithoutRoleRaw],
  files: [],
  users: [user11],
  categories: [],
  feeds: [],
};

describe('onCommunityUserRoleAdded', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after role added to community user', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserRoleRemoved(callback);
    client.emitter.emit('community.roleRemoved', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith({ ...community, isJoined: true }, userWithoutRole);
  });

  test('it should got nothing if we did unsubscribe before event', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserRoleRemoved(callback);

    unsub();

    client.emitter.emit('community.roleRemoved', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
