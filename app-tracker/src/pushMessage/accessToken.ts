import axios from 'axios';
import { apiKey, baseUrlV4, sessions } from './constant';

const getAccessToken = async (): Promise<string> => {
  const { data }: Record<string, any> = await axios.post(
    `${baseUrlV4}/${sessions}`,
    {
      userId: 'Hey Guys!!',
      deviceId: 'Macintosh',
    },
    {
      headers: {
        'x-api-key': apiKey,
      },
    }
  );

  const accessToken: string = data.accessToken;
  return accessToken;
};

export { getAccessToken };
