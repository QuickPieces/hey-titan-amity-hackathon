// on/off
export * from './enableCache';
export * from './disableCache';

// persistency
export * from './restoreCache';
export * from './backupCache';
export * from './wipeCache';

// fetch
export * from './queryCache';
export * from './pullFromCache';

// mutate
export * from './pushToCache';
export * from './mergeInCache';
export * from './upsertInCache';
export * from './dropFromCache';

/*
 * ingestInCache and syncInCache and isInTombstone
 * and pushToTombstone are not exported ;
 * we don't want it as part of the sdk's public api.
 */
