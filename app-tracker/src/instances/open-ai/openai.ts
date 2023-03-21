import { Configuration, OpenAIApi } from 'openai';
import { IOpenAI } from './openai.interfaces';

export default class OpenAI implements IOpenAI {
  private instance: OpenAIApi;
  constructor() {
    this.instance = this.init();
  }
  private init(): OpenAIApi {
    const configuration = new Configuration({
      //organization: process.env.OEPN_AI_ORG_ID,
      apiKey: process.env.OPEN_AI_API_KEY,
    });

    return new OpenAIApi(configuration);
  }

  public getInstance(): OpenAIApi {
    return this.instance;
  }
}
