import { getActiveClient } from './activeClient';

/**
 * ```js
 * import { getSocialSettings } from '@amityco/ts-sdk'
 * const socialSettings = await getSocialSettings()
 * ```
 *
 * Fetches a {@link Amity.SocialSettings} object
 *
 * @returns A Promise of {@link Amity.SocialSettings} object
 *
 * @category Client API
 * @async
 */
export const getSocialSettings = async (): Promise<Amity.SocialSettings> => {
  const client = getActiveClient();

  const { data } = await client.http.get<{ socialNetworkSetting: Amity.SocialSettings }>(
    `/api/v3/network-settings/social`,
  );

  return data.socialNetworkSetting;
};
