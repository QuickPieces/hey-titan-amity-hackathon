import { createClient } from '../createClient';

describe('createClient', () => {
  test('it should create client', () => {
    const client = createClient('test-api-key');

    expect(client).toBeDefined();
  });

  test('it should define http transport', () => {
    const client = createClient('test-api-key');

    expect(client.http).toBeDefined();
  });

  test('it should define ws transport', () => {
    const client = createClient('test-api-key');

    expect(client.ws).toBeDefined();
  });

  test('it should define mqtt transport', () => {
    const client = createClient('test-api-key');

    expect(client.mqtt).toBeDefined();
  });

  test('it should define event emitter', () => {
    const client = createClient('test-api-key');

    expect(client.emitter).toBeDefined();
  });

  test('it should return existing client if there is one', () => {
    const expected = createClient('test-api-key');
    const recieved = createClient('test-api-key');

    expect(recieved).toStrictEqual(expected);
  });

  test('it should set not logged in as the start up session state', () => {
    const got = createClient('key', 'sg');
    const { sessionState } = got;

    expect(got).toBeDefined();
    expect(sessionState).toBe(Amity.SessionStates.NOT_LOGGED_IN);
  });
});
