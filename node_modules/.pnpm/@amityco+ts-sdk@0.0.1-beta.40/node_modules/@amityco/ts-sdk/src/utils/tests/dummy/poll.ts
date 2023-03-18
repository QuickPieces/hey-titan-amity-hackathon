import { user11 } from '.';

export const poll11: Amity.Poll = {
  pollId: 'c7b7c3e52be052be3fd5b5f0b4033d501667195535489',
  userId: 'test',
  question: 'Yellow',
  answers: [
    {
      dataType: 'text',
      data: '1',
      isVotedByUser: false,
      voteCount: 0,
      id: '635f628f651eeb361624a8b6',
    },
    {
      dataType: 'text',
      data: '2',
      isVotedByUser: false,
      voteCount: 0,
      id: '635f628f651eeb619424a8b7',
    },
    {
      dataType: 'text',
      data: '3',
      isVotedByUser: false,
      voteCount: 0,
      id: '635f628f651eeb391f24a8b8',
    },
  ],
  answerType: 'single',
  closedAt: '2022-11-30T05:52:15.489Z',
  createdAt: '2022-10-31T05:52:15.493Z',
  updatedAt: '2022-10-31T05:52:15.493Z',
  isVoted: false,
  status: 'open',
  closedIn: 2592000000,
  isDeleted: false,
};

export const pollPayload: Amity.PollPayload = {
  polls: [poll11],
  users: [user11],
};
