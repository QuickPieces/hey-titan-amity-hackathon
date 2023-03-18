/**
 * ```js
 * import { updateUser } from '@amityco/ts-sdk'
 * const updated = await updateUser(userId, { displayName: 'foobar' })
 * ```
 *
 * Updates an {@link Amity.User}
 *
 * @param userId The ID of the {@link Amity.User} to update
 * @param patch The patch data to apply
 * @returns the updated {@link Amity.User} object
 *
 * @category User API
 * @async
 */
export declare const updateUser: (userId: Amity.User['userId'], patch: Patch<Amity.User, 'displayName' | 'description' | 'avatarFileId' | 'avatarCustomUrl' | 'metadata'>) => Promise<Amity.Cached<Amity.User>>;
//# sourceMappingURL=updateUser.d.ts.map