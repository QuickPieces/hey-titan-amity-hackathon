import { withUser } from '~/group/utils';
import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
  user11,
} from '~/utils/tests';

import { onCommunityUserAdded } from '../onCommunityUserAdded';

const communityToAddUserTo = community11;
const userToAddRaw = communityUser11;
const userToAdd = withUser(userToAddRaw);

const eventPayload: Amity.CommunityMembershipPayload = {
  communities: [communityToAddUserTo],
  communityUsers: [userToAddRaw],
  files: [],
  users: [user11],
  categories: [],
  feeds: [],
};

describe('onCommunityUserAdded', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after added community user', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserAdded(callback);
    client.emitter.emit('community.userAdded', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith({ ...communityToAddUserTo, isJoined: true }, userToAdd);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onCommunityUserAdded(callback);

    unsub();

    client.emitter.emit('community.userAdded', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
