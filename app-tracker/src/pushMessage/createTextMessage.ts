import axios from 'axios';
import { baseUrlV3, messages } from './constant';
const createTextMessage = async (accessToken: string, channelId: string, textMessage: string): Promise<void> => {
  await axios.post(
    `${baseUrlV3}/${messages}`,
    {
      channelId,
      data: {
        text: textMessage,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
};

export { createTextMessage };
