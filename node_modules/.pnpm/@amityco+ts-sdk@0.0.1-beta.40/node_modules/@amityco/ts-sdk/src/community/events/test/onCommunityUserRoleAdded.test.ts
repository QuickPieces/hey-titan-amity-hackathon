import { withUser } from '~/group/utils';
import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
  user11,
} from '~/utils/tests';

import { onCommunityUserRoleAdded } from '../onCommunityUserRoleAdded';

const community = community11;
const userWithRoleRaw = { ...communityUser11, role: ['new-role'] };
const userWithRole = withUser(userWithRoleRaw);

const eventPayload: Amity.CommunityMembershipPayload = {
  communities: [community],
  communityUsers: [userWithRoleRaw],
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
    const unsub = onCommunityUserRoleAdded(callback);
    client.emitter.emit('community.roleAdded', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith({ ...community, isJoined: true }, userWithRole);
  });

  test('it should got nothing if we did unsubscribe before event', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserRoleAdded(callback);

    unsub();

    client.emitter.emit('community.roleAdded', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
