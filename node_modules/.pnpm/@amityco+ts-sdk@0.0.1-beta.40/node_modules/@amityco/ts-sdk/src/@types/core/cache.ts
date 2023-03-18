export {};

declare global {
  namespace Amity {
    /**
     * Union of acceptable types for a chunk of cache key.
     * Recursive type which allow 3 primitives + array or object of them.
     *
     * @hidden
     */
    type Serializable =
      | string
      | number
      | boolean
      | undefined
      | Serializable[]
      | { [key: string]: Serializable };

    /**
     * Cache key description. Similarly to react-query,
     * the key is an array of serializable values.
     */
    type CacheKey = Serializable[];

    /**
     * Cache options are separated from CacheEntry for further type
     * manipulations and passing of options in functions.
     *
     * The cache options are:
     *   - cachedAt(number): used to check is the cached content is still
     *     considered fresh or not.
     *
     *   - offline(boolean): used to determine if the entry must be
     *     saved in persistent storage on top of the regular caching.
     */
    type CacheOptions = {
      cachedAt: number | undefined;
      offline?: boolean;
    };

    type TombstoneCacheOptions = {
      cachedAt: number;
    };

    /**
     * Cache entry wrapper. It contains the cached content
     * itself (data: T) and also several other properties
     * through CacheOptions to allow fine tuned control.
     */
    type CacheEntry<T extends unknown = unknown> = {
      key: CacheKey;
      data: T;
    } & CacheOptions;

    /**
     * Minimal CacheEntry alias, used mostly
     */
    type Cached<T extends unknown = unknown> = (T extends Amity.Paged<any, infer K>
      ? T
      : { data: T }) & {
      cachedAt: CacheOptions['cachedAt'];
    };

    /**
     * Main interface for the cache data structure. There's no direct
     * methods there as we want to keep the object easily serializable
     * (over JSON.stringify/parse) for simple backup/hydration.
     */
    type Cache = {
      data: Record<string, CacheEntry>;
      persistIf?: (key: CacheKey, data?: any) => boolean;
    };
  }
}
