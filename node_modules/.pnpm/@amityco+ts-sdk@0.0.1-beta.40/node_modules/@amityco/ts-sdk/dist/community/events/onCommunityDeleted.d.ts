/**
 * ```js
 * import { onCommunityDeleted } from '@amityco/ts-sdk'
 * const dispose = onCommunityDeleted(community => {
 *   // ...
 * })
 * ```
 *
 * Fired when a {@link Amity.Community} has been deleted
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Community Events
 */
export declare const onCommunityDeleted: (callback: Amity.Listener<Amity.Community>) => Amity.Unsubscriber;
//# sourceMappingURL=onCommunityDeleted.d.ts.map