import { client, poll11 } from '~/utils/tests';
import { ASCError } from '~/core/errors';
import { disableCache, enableCache } from '~/cache/api';
import { createPoll } from '../createPoll';
import { getPoll } from '../getPoll';

describe('createPoll', () => {
  beforeAll(enableCache);
  afterAll(disableCache);

  const bundle: Parameters<typeof createPoll>[0] = {
    answerType: 'single',
    answers: [
      {
        data: 'answer1',
        dataType: 'text',
      },
      {
        data: 'answer1',
        dataType: 'text',
      },
    ],
    question: 'question',
  };

  // integration_test_id: 5dc099fd-8e89-4f78-bf6c-fda6dbd06b66
  it('should create a poll with a single answer', async () => {
    client.http.post = jest.fn().mockResolvedValueOnce({ data: { polls: [poll11] } });

    const { data: poll } = await createPoll(bundle);
    const { data: cachedPoll } = getPoll.locally(poll.pollId)!;

    expect(poll.pollId).toBeDefined();
    expect(cachedPoll).toMatchObject(poll);
  });

  // integration_test_id: d18d4f13-6ac5-42f1-822b-a22fc0a7cf90
  it('should create a poll with multiple answers', async () => {
    client.http.post = jest.fn().mockResolvedValueOnce({ data: { polls: [poll11] } });

    const { data: poll } = await createPoll({
      ...bundle,
      answerType: 'multiple',
    });

    expect(poll.pollId).toBeDefined();
  });

  // integration_test_id: 4cda145c-0bc8-4aaf-9ec0-02676bbde8a6
  it('should fail if question exceeds 500 characters', async () => {
    client.http.post = jest
      .fn()
      .mockRejectedValueOnce(
        new ASCError('error message', Amity.ServerError.BUSINESS_ERROR, Amity.ErrorLevel.FATAL),
      );

    await expect(() => createPoll(bundle)).rejects.toThrow();
  });

  // integration_test_id: a96780e1-758e-4de7-9c18-fdb34c4cacc7
  it('should fail if question exceeds 200 characters', async () => {
    client.http.post = jest
      .fn()
      .mockRejectedValueOnce(
        new ASCError('error message', Amity.ServerError.BUSINESS_ERROR, Amity.ErrorLevel.FATAL),
      );

    await expect(() => createPoll(bundle)).rejects.toThrow();
  });
});
