/**
 * Type guard to check and cast that a given async function is has the ".locally" property
 *
 * @param func any SDK APi function
 * @returns success boolean if the function has a 'locally' twin
 *
 * @hidden
 */
export declare const isFetcher: <Args extends any[], Returned extends unknown>(func: Amity.AsyncFunc<Args, Returned>) => func is Amity.FetcherFunc<Args, Returned>;
/**
 * Type guard to check and cast that a given async function is has the ".optimistically" property
 *
 * @param func any SDK APi function
 * @returns success boolean if the function has an 'optimistically' twin
 *
 * @hidden
 */
export declare const isMutator: <Args extends any[], Returned extends unknown>(func: Amity.AsyncFunc<Args, Returned>) => func is Amity.MutatorFunc<Args, Returned>;
/**
 * Type guard to check and cast that a given async function is has
 * the ".locally" or ".optimistically" property
 *
 * @param func any SDK APi function
 * @returns success boolean if the function has an offline twin
 *
 * @hidden
 */
export declare const isOffline: <Args extends any[], Returned extends unknown>(func: Amity.AsyncFunc<Args, Returned>) => func is Amity.OfflineFunc<Args, Returned>;
/**
 * Type guard to check and cast that a given object has the "cachedAt" property
 *
 * @param model any object to check on
 * @returns success boolean if the object has property "cachedAt"
 *
 * @hidden
 */
export declare const isCachable: (model: any) => model is Amity.Cachable;
/**
 * Checks if a model is considered local (cachedAt === -1)
 *
 * @param model any cachable object to check
 * @returns success boolean if the object is marked as local
 *
 * @hidden
 */
export declare const isLocal: (model?: any) => model is Amity.Local;
/**
 * Checks if a model is considered fresh
 *
 * @param model any cachable object to check
 * @param lifeSpan the supposedly duration for which the object is considered synced
 * @returns success boolean if the object is below the given lifespan
 *
 * @hidden
 */
export declare const isFresh: (model?: Amity.Cachable, lifeSpan?: number) => boolean;
/**
 * ```js
 * import { createQuery, getUser } from '@amityco/ts-sdk'
 * const query = createQuery(getUser, 'foobar')
 * ```
 *
 * Creates a wrapper for the API call you wish to call.
 * This wrapper is necessary to create for optimistically calls
 *
 *
 * @param func A compatible API function from the ts sdk
 * @param args The arguments to pass to the function passed as `fn`
 * @returns A wrapper containing both the function and its future arguments
 *
 * @category Query
 */
export declare const createQuery: <Args extends any[], Returned extends unknown>(func: Amity.AsyncFunc<Args, Returned> | Amity.OfflineFunc<Args, Returned>, ...args: Args) => {
    func: Amity.AsyncFunc<Args, Returned> | Amity.OfflineFunc<Args, Returned>;
    args: Args;
};
/**
 * ```js
 * import { queryOptions } from '@amityco/ts-sdk'
 * const options = queryOptions('no_fetch', lifeSpan)
 * ```
 *
 * Creates a query options object based on the query policy passed
 *
 * @param policy The policy to apply to a query
 * @returns A properly set query options object
 *
 * @category Query
 */
export declare const queryOptions: (policy: Amity.QueryPolicy, lifeSpan?: number) => Amity.QueryOptions;
/**
 * ```js
 * import { createQuery, getUser, runQuery } from '@amityco/ts-sdk'
 * const query = createQuery(getUser, client, 'foobar')
 * runQuery(query,  user => console.log(user))
 * ```
 *
 * Calls an API function wrapped around a Amity.Query, and executes the callback whenever
 * a value is available. The value can be picked either from the local cache and/or
 * from the server afterwards depending on the query options passed
 *
 * @param query A query object wrapping the call to be made
 * @param callback A function to execute when a value is available
 * @param options the query options
 *
 * @category Query
 */
export declare const runQuery: <Args extends any[], Returned extends unknown>({ func, args }: Amity.Query<Args, Returned>, callback?: ((args: Amity.Snapshot<Returned>) => void) | undefined, options?: Amity.QueryOptions) => void;
//# sourceMappingURL=query.d.ts.map