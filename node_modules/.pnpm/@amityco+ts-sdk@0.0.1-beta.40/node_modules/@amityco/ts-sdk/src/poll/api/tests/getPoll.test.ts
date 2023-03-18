import { client, poll11 } from '~/utils/tests';
import { ASCError } from '~/core/errors';
import { disableCache, enableCache } from '~/cache/api';
import { getPoll } from '../getPoll';

describe('getPoll', () => {
  beforeAll(enableCache);
  afterAll(disableCache);

  // integration_test_id: 0d096a75-2f42-489e-8435-e3022eafb1a3
  it('should fetch the poll', async () => {
    client.http.get = jest.fn().mockResolvedValueOnce({ data: { polls: [poll11] } });

    const { data: poll } = await getPoll(poll11.pollId);
    const { data: cachedPoll } = getPoll.locally(poll11.pollId)!;

    expect(poll.pollId).toEqual(poll11.pollId);
    expect(cachedPoll).toMatchObject(poll);
  });

  // integration_test_id: 074fdf85-bbb6-4957-a89e-26aa10871dc4
  it('should fail to fetch if the poll does not exist', async () => {
    client.http.get = jest
      .fn()
      .mockRejectedValueOnce(
        new ASCError('error message', Amity.ServerError.ITEM_NOT_FOUND, Amity.ErrorLevel.FATAL),
      );

    await expect(() => getPoll('non-existent-poll-id')).rejects.toThrow();
  });
});
