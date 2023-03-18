import { rolesAndPermissions } from '.';

export const baseMembership: Amity.RawMembership<Amity.GroupType> = {
  channelId: '',
  communityId: '',
  communityMembership: 'member',
  createdAt: '',
  isBanned: false,
  isMuted: false,
  lastActivity: '',
  lastMentionedSegment: 0,
  membership: 'member',
  muteTimeout: '',
  readToSegment: 0,
  updatedAt: '',
  userId: '',
  ...rolesAndPermissions,
};
