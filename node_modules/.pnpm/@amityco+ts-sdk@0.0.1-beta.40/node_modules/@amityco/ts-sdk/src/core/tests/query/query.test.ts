import {
  isFetcher,
  isMutator,
  isOffline,
  isCachable,
  isLocal,
  isFresh,
  queryOptions,
} from '~/core/query';
import { CACHE_LIFESPAN } from '~/cache/utils';

describe('Core/Query', () => {
  type isFetcherMockType = jest.Mock<any, any> & {
    locally?: jest.Mock<any, any>;
  };

  type isMutatorMockType = jest.Mock<any, any> & {
    optimistically?: jest.Mock<any, any>;
  };

  describe('isFetcher', () => {
    const isFetcherMock: isFetcherMockType = jest.fn();

    test('should return false if func is not a fetcher', () => {
      expect(isFetcher(isFetcherMock)).toBe(false);
    });

    test('should return true if func is a fetcher', () => {
      isFetcherMock.locally = jest.fn();

      expect(isFetcher(isFetcherMock)).toBe(true);
    });
  });

  describe('isMutator', () => {
    const isMutatorMock: isMutatorMockType = jest.fn();

    test('should return false if func is not a mutator', () => {
      expect(isMutator(isMutatorMock)).toBe(false);
    });

    test('should return true if func is a mutator', () => {
      isMutatorMock.optimistically = jest.fn();

      expect(isMutator(isMutatorMock)).toBe(true);
    });
  });

  describe('isOffline', () => {
    const isMutatorMock: isMutatorMockType = jest.fn();

    test('should return false if func is not a mutator or fetcher', () => {
      expect(isOffline(isMutatorMock)).toBe(false);
    });

    test('should return true if func is a mutator', () => {
      isMutatorMock.optimistically = jest.fn();

      expect(isMutator(isMutatorMock)).toBe(true);
    });
  });

  describe('isCachable', () => {
    test('should return false if object is not cachable', () => {
      expect(isCachable({})).toBe(false);
    });

    test('should return true if object is cachable', () => {
      expect(isCachable({ cachedAt: -1 })).toBe(true);
    });
  });

  describe('isLocal', () => {
    test('should return false if object is not local', () => {
      expect(isLocal({ cachedAt: 0 })).toBe(false);
    });

    test('should return true if object is local', () => {
      expect(isLocal({ cachedAt: -1 })).toBe(true);
    });
  });

  describe('isFresh', () => {
    test('should return false if object is not fresh', () => {
      expect(isFresh({ cachedAt: -1 })).toBe(false);
    });

    test('should return true if object is fresh', () => {
      expect(isFresh({ cachedAt: Date.now() })).toBe(true);
    });
  });

  describe('queryOptions', () => {
    test('should return minimum lifeSpan', () => {
      expect(queryOptions('cache_then_server').lifeSpan).toBe(CACHE_LIFESPAN);
    });

    test('should return minimum lifeSpan if provided lifeSpan is less than cache lifeSpan', () => {
      expect(queryOptions('cache_then_server', 0).lifeSpan).toBe(CACHE_LIFESPAN);
    });

    test('should return provided lifeSpan if provided lifeSpan is more than cache lifeSpan', () => {
      const value = CACHE_LIFESPAN * 2;
      expect(queryOptions('cache_then_server', value).lifeSpan).toBe(value);
    });

    test('should return lifespan Infinity if cache only', () => {
      expect(queryOptions('cache_only').lifeSpan).toBe(Infinity);
    });
  });
});
