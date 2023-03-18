/**
 * Manually computed type which links each key with a function
 * used to return the object's unique id. The type is computed
 * to avoid using any and give some typing security at the
 * resolver's level.
 */
declare type Resolver<T extends Amity.Domain> = (model: Amity.Minimal[T]) => string;
/**
 * Retrieve the id resolver matching a domain name
 *
 * @param name the domain name for the resolve
 * @returns an idResolver function for the given domain name
 */
export declare const getResolver: <T extends keyof Amity.Models>(name: T) => Resolver<T>;
export {};
//# sourceMappingURL=idResolvers.d.ts.map