import { getActiveUser } from '../activeUser';
import { connectClient, disconnectClient } from '~/utils/tests';

describe('API: Active User', () => {
  afterAll(disconnectClient);

  test('should got error message when client is offline', () => {
    try {
      getActiveUser();
    } catch (error) {
      expect(String(error)).toContain('Error: Amity SDK (800000): Connect client first');
    }
  });

  test('should get active user when client is online', async () => {
    await connectClient();
    const data = getActiveUser();
    expect(data.userId).toBe('test');
  });
});
