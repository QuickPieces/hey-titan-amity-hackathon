import { ASCError } from '~/core/errors';
import { getActiveClient } from '../activeClient';

import { connectClient, disconnectClient, pause } from '~/utils/tests';

import { setSessionState } from '../setSessionState';
import { onSessionStateChange } from '../../events';

describe('setSessionState', () => {
  beforeEach(async () => {
    await connectClient();
  });

  afterEach(async () => {
    await disconnectClient();
  });

  test('it should set new session state', () => {
    const client = getActiveClient();
    const expected = Amity.SessionStates.NOT_LOGGED_IN;

    setSessionState(expected);

    expect(client.sessionState).toBe(expected);
  });

  test('it should return true if state changed successully', () => {
    const expected = true;

    const recieved = setSessionState(Amity.SessionStates.NOT_LOGGED_IN);

    expect(recieved).toBe(expected);
  });

  test('it should fire event on state change', async () => {
    const callback = jest.fn();

    const expected = Amity.SessionStates.NOT_LOGGED_IN;
    const unsub = onSessionStateChange(callback);

    const recieved = setSessionState(expected);

    // wait for event handler
    await pause();

    expect(recieved).toBe(true);
    expect(callback).toHaveBeenCalledWith(expected);

    unsub();
  });

  test('it should not allow invalid state change', async () => {
    /*
     * as state changes from established -> established are not possible, even
     * for cases when logging in with already logged in user it should go to
     * establishing first
     */
    const nextState = Amity.SessionStates.ESTABLISHED;

    expect(setSessionState(nextState)).toBe(false);
  });
});
