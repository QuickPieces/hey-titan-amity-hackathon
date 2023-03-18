import { getAccessToken } from './accessToken';
import { createChannel } from './createChannel';
import { createTextMessage } from './createTextMessage';

const pushMessageToChat = async (textMessage: string): Promise<void> => {
  const accessToken: string = await getAccessToken();
  const { channelId }: Record<string, any> = await createChannel(accessToken);
  await createTextMessage(accessToken, channelId, textMessage);
};

export default pushMessageToChat;
