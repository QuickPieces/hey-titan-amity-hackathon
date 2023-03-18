/**
 * ```js
 * import { getCategory } from '@amityco/ts-sdk'
 * const { data: category } = await getCategory('foo')
 * ```
 *
 * Fetches a {@link Amity.Category} object
 *
 * @param categoryId the ID of the {@link Amity.Category} to fetch
 * @returns the associated {@link Amity.Category} object
 *
 * @category Category API
 * @async
 */
export declare const getCategory: {
    (categoryId: Amity.Category['categoryId']): Promise<Amity.Cached<Amity.Category>>;
    /**
     * ```js
     * import { getCategory } from '@amityco/ts-sdk'
     * const { data: category } = getCategory.locally('foobar')
     * ```
     *
     * Fetches a {@link Amity.Category} object from cache
     *
     * @param categoryId the ID of the {@link Amity.Category} to fetch
     * @returns the associated {@link Amity.Category} object
     *
     * @category Category API
     */
    locally(categoryId: Amity.Category['categoryId']): Amity.Cached<Amity.Category> | undefined;
};
//# sourceMappingURL=getCategory.d.ts.map