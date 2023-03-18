import { withUser } from '~/group/utils';
import {
  client,
  connectClient,
  disconnectClient,
  community11,
  communityUser11,
  user11,
} from '~/utils/tests';

import { onCommunityJoined } from '../onCommunityJoined';

const communityToJoin = community11;
const joinedUserRaw = communityUser11;
const joinedUser = withUser(joinedUserRaw);

const eventPayload: Amity.CommunityMembershipPayload = {
  communities: [communityToJoin],
  communityUsers: [joinedUserRaw],
  files: [],
  users: [user11],
  categories: [],
  feeds: [],
};

describe('onCommunityJoined', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  test('it should got event after join community', () => {
    const callback = jest.fn();
    const unsub = onCommunityJoined(callback);
    client.emitter.emit('community.joined', eventPayload);

    unsub();

    expect(callback).toHaveBeenCalled();
    expect(callback).toHaveBeenCalledWith({ ...communityToJoin, isJoined: true }, joinedUser);
  });

  test('it should got nothing if we did unsubscribe before got event', () => {
    const callback = jest.fn();
    const unsub = onCommunityJoined(callback);

    unsub();

    client.emitter.emit('community.joined', eventPayload);
    expect(callback).not.toHaveBeenCalled();
  });
});
