import { getActiveClient } from '../activeClient';
import { connectClient, disconnectClient } from '~/utils/tests';

describe('API: Active Client', () => {
  afterAll(disconnectClient);

  test('should got error message when activeClient is offline', () => {
    try {
      getActiveClient();
    } catch (error) {
      expect(String(error)).toContain('Error: Amity SDK (800000): There is no active client');
    }
  });

  test('should get client when activeClient is online', async () => {
    await connectClient();
    const data = getActiveClient();
    expect(data.userId).toBe('test');
  });
});
