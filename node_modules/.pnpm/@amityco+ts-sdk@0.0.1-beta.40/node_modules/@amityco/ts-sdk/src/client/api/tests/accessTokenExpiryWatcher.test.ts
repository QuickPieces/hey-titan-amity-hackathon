import { client, connectClient, disconnectClient } from '~/utils/tests';
import { ACCESS_TOKEN_WATCHER_INTERVAL } from '~/utils/constants';

import { accessTokenExpiryWatcher, isAboutToExpire, isExpired } from '../accessTokenExpiryWatcher';

import { onTokenExpired } from '~/client/events/onTokenExpired';

describe('accessTokenExpiryWatcher', () => {
  beforeAll(async () => {
    await connectClient();
  });

  afterAll(async () => {
    await disconnectClient();
  });

  const expiresAt = new Date().toISOString();
  const issuedAt = new Date().toISOString();

  test('it should fire event when session expires', async () => {
    const sessionHandler: Amity.SessionHandler = {
      sessionWillRenewAccessToken(_) {
        // do nothing
      },
    };

    jest.useFakeTimers();
    const callback = jest.fn();
    const expected = Amity.SessionStates.TOKEN_EXPIRED;

    const unsub = onTokenExpired(callback);
    const stopWatcher = accessTokenExpiryWatcher(expiresAt, issuedAt, sessionHandler!);

    jest.advanceTimersByTime(ACCESS_TOKEN_WATCHER_INTERVAL + 1);

    expect(callback).toBeCalledWith(expected);

    unsub();
    stopWatcher();
  });

  test('it should renew token if session is about to expire', async () => {
    jest.useFakeTimers();
    const callback = jest.fn();

    const sessionHandler = { sessionWillRenewAccessToken: callback };
    client.sessionHandler = sessionHandler;

    const stopWatcher = accessTokenExpiryWatcher(expiresAt, issuedAt, sessionHandler);

    const oldIssuedAtTime = new Date();
    const aboutToExpireTime = new Date();

    aboutToExpireTime.setMinutes(aboutToExpireTime.getMinutes() + 30);
    oldIssuedAtTime.setDate(oldIssuedAtTime.getDate() - 1);

    aboutToExpireTime.setHours(aboutToExpireTime.getHours() + 1);

    if (client.token) {
      client.token.expiresAt = aboutToExpireTime.toISOString();
      client.token.issuedAt = oldIssuedAtTime.toISOString();
    }

    jest.advanceTimersByTime(ACCESS_TOKEN_WATCHER_INTERVAL + 1);
    stopWatcher();

    expect(callback).toHaveBeenCalled();
  });

  test('it should renew token if session has expired', async () => {
    jest.useFakeTimers();
    const callback = jest.fn();

    const sessionHandler = { sessionWillRenewAccessToken: callback };
    client.sessionHandler = sessionHandler;

    const stopWatcher = accessTokenExpiryWatcher(expiresAt, issuedAt, sessionHandler);
    if (client.token) client.token.expiresAt = new Date().toISOString();

    jest.advanceTimersByTime(ACCESS_TOKEN_WATCHER_INTERVAL + 1);

    expect(callback).toHaveBeenCalled();

    stopWatcher();
  });
});

describe('accessTokenExpiryWatcher > aboutToExpire', () => {
  const expiresAt = new Date().toISOString();
  const issuedAt = new Date().toISOString();
  const oldIssuedAtTime = new Date();
  const aboutToExpireTime = new Date();

  test('it should return true if about to expire', () => {
    oldIssuedAtTime.setDate(oldIssuedAtTime.getDate() - 1);

    aboutToExpireTime.setHours(aboutToExpireTime.getHours() + 1);

    expect(
      isAboutToExpire({
        expiresAt: aboutToExpireTime.toISOString(),
        issuedAt: oldIssuedAtTime.toISOString(),
      }),
    ).toBe(true);
  });

  test('it should return false if token expired', () => {
    expect(isAboutToExpire({ expiresAt, issuedAt })).toBe(false);
  });

  test('it should return false if not about to expire', () => {
    oldIssuedAtTime.setDate(oldIssuedAtTime.getDate() - 10);

    expect(isAboutToExpire({ expiresAt, issuedAt })).toBe(false);
  });
});

describe('accessTokenExpiryWatcher > isExpired', () => {
  let expiresAt = new Date().toISOString();

  test('it should return true if token expired', () => {
    expect(isExpired(expiresAt)).toBe(true);
  });

  test('it should return false if token not about expired', () => {
    const laterDate = new Date();
    laterDate.setMonth(laterDate.getMonth() + 1);
    expiresAt = laterDate.toISOString();

    expect(isExpired(expiresAt)).toBe(false);
  });
});
