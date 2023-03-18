import { disableCache, enableCache } from '~/cache/api';
import { ingestInCache } from '~/cache/api/ingestInCache';
import { withUser, withUsers } from '~/group/utils';
import { baseMembership, user11, user12 } from '~/utils/tests';

const users = [user11, user12];

const member1: Amity.RawMembership<Amity.GroupType> = { ...baseMembership, userId: user11.userId };
const mappedMember1: Amity.Membership<Amity.GroupType> = { ...member1, user: user11 };
const unmapableMember1: Amity.Membership<Amity.GroupType> = { ...member1, user: undefined };

const member2: Amity.RawMembership<Amity.GroupType> = { ...baseMembership, userId: user12.userId };
const mappedMember2: Amity.Membership<Amity.GroupType> = { ...member2, user: user12 };
const unmapableMember2: Amity.Membership<Amity.GroupType> = { ...member2, user: undefined };

const members1: Amity.RawMembership<Amity.GroupType>[] = [member1, member2];
const mappedMembers1: Amity.Membership<Amity.GroupType>[] = [mappedMember1, mappedMember2];
const unmapableMembers1: Amity.Membership<Amity.GroupType>[] = [unmapableMember1, unmapableMember2];

describe('withUser', () => {
  test('should return mapped member', () => {
    expect.assertions(2);
    enableCache();
    ingestInCache({ users });

    expect(withUser(member1)).toEqual(mappedMember1);
    expect(withUser(member2)).toEqual(mappedMember2);

    disableCache();
  });

  test('`.user` should return undefined if cache disabled', () => {
    disableCache();

    expect(withUser(member1)).toEqual(unmapableMember1);
  });

  test('`.user` should return error member', () => {
    expect.assertions(2);
    enableCache();
    ingestInCache({ users });

    expect(withUser(member1)).toEqual(mappedMember1);
    expect(withUser(member2)).toEqual(mappedMember2);

    disableCache();
  });

  test('`.user` should return undefined when user not exist', () => {
    enableCache();
    ingestInCache({ users });
    const member: Amity.RawMembership<Amity.GroupType> = {
      ...member1,
      userId: 'not-exist-user-id',
    };
    const expected: Amity.Membership<Amity.GroupType> = {
      ...member,
      user: undefined,
    };

    expect(withUser(member)).toEqual(expected);

    disableCache();
  });
});

describe('withUsers', () => {
  test('should return mapped members', () => {
    enableCache();
    ingestInCache({ users });

    expect(withUsers(members1)).toEqual(mappedMembers1);

    disableCache();
  });

  test('`.user` should return undefined if cache disabled', () => {
    disableCache();

    expect(withUsers(members1)).toEqual(unmapableMembers1);
  });

  test('`.user` should return undefined when some user not exist', () => {
    enableCache();
    ingestInCache({ users });
    const members: Amity.RawMembership<Amity.GroupType>[] = [
      ...members1,
      { ...member1, userId: 'not-exist-user-id' },
    ];
    const expected = [
      ...mappedMembers1,
      {
        ...unmapableMember1,
        userId: 'not-exist-user-id',
        user: undefined,
      },
    ];

    expect(withUsers(members)).toEqual(expected);

    disableCache();
  });
});
