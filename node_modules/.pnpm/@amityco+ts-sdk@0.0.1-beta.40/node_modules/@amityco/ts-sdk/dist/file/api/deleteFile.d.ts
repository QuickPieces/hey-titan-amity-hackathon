/**
 * ```js
 * import { deleteFile } from '@amityco/ts-sdk'
 * const success = await deleteFile('foo')
 * ```
 *
 * Deletes a {@link Amity.File}
 *
 * @param fileId The {@link Amity.File} ID to delete
 * @return A success boolean if the {@link Amity.File} was deleted
 *
 * @category File API
 * @async
 */
export declare const deleteFile: (fileId: Amity.File<any>['fileId']) => Promise<{
    success: boolean;
}>;
//# sourceMappingURL=deleteFile.d.ts.map