import axios from 'axios';
import { baseUrlV3, channels } from './constant';

const createChannel = async (accessToken: string): Promise<Record<string, any>> => {
  try {
    const { data }: Record<string, any> = await axios.post(
      `${baseUrlV3}/${channels}`,
      {
        channelId: 'Techno titan mock',
        type: 'community',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const response: Record<string, any> = {
      channelId: data.channels[0].channelId,
    };
    return response;
  } catch (error: any) {
    const data: Record<string, any> = JSON.parse(error.config.data);
    const response: Record<string, any> = {
      channelId: data.channelId,
    };
    return response;
  }
};

export { createChannel };
