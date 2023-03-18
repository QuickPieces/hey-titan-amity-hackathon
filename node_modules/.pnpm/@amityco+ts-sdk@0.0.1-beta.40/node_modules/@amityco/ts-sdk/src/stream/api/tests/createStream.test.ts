import { getActiveClient } from '~/client/api';
import { client, connectClient, disconnectClient, streamResponse } from '~/utils/tests';
import { createStream } from '../createStream';

const bundle: Parameters<typeof createStream>[0] = {
  title: 'my stream',
  thumbnailFileId: streamResponse.data.videoStreamings[0].thumbnailFileId,
};

describe('createStream', () => {
  beforeAll(connectClient);
  afterAll(disconnectClient);

  it('creates a stream and returns the new stream', async () => {
    client.http.post = jest.fn().mockResolvedValueOnce(streamResponse);

    const created = await createStream(bundle);

    expect(getActiveClient().http.post).toHaveBeenCalledWith(`/api/v3/video-streaming`, bundle);
    expect(created.data).toEqual(streamResponse.data.videoStreamings[0]);
  });
});
