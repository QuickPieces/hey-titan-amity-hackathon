import { client, connectClient } from '~/utils/tests';

import { terminateClient } from '../terminateClient';

const disconnect = () => setTimeout(() => client.ws.emit('disconnect'), 500);

describe('terminateClient', () => {
  beforeAll(async () => {
    await connectClient();
  });

  test('it should terminate client session', async () => {
    disconnect().unref();

    const expected = Amity.SessionStates.TERMINATED;

    terminateClient();

    expect(client.sessionState).toBe(expected);
  });

  test('it should clear sessionHandler', async () => {
    disconnect().unref();

    terminateClient();

    expect(client.sessionHandler).toBeUndefined();
  });
});
