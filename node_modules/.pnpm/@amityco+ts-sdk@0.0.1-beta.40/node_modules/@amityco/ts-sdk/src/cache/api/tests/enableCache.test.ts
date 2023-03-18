import { connectClient, client, disconnectClient } from '~/utils/tests';

import { enableCache } from '../enableCache';

describe('enableCache', () => {
  test('it should enable cache', async () => {
    await connectClient();

    enableCache();

    expect(client.cache).toBeDefined();

    disconnectClient();
  });
});
