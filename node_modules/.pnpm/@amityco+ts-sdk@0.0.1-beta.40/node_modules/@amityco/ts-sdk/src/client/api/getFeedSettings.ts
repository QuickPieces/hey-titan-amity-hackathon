import { getActiveClient } from './activeClient';

/**
 * ```js
 * import { getFeedSettings } from '@amityco/ts-sdk'
 * const feedSettings = await getFeedSettings()
 * const postFeedSetting = feedSettings.post
 * ```
 *
 * Fetches a {@link Amity.FeedSettings} object
 *
 * @returns A Promise of {@link Amity.FeedSettings} object
 *
 * @category Client API
 * @async
 */
export const getFeedSettings = async (): Promise<Amity.FeedSettings> => {
  const client = getActiveClient();

  const { data } = await client.http.get<Amity.FeedSettingPayload>(
    `/api/v3/network-settings/feed-setting`,
  );

  return Object.fromEntries(
    data.feedSettings.map(({ feedType, contentSettings }) => {
      return [feedType, contentSettings];
    }),
  );
};
