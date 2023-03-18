import { getActiveClient } from './activeClient';

/**
 * ```js
 * import { getChatSettings } from '@amityco/ts-sdk'
 * const chatSettings = await getChatSettings()
 * ```
 *
 * Fetches a {@link Amity.ChatSettings} object
 *
 * @returns A Promise of {@link Amity.ChatSettings} object
 *
 * @category Client API
 * @async
 */
export const getChatSettings = async (): Promise<Amity.ChatSettings> => {
  const client = getActiveClient();

  const { data } = await client.http.get<Amity.ChatSettings>(`/api/v3/network-settings/chat`);

  return data;
};
