import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import OpenAI from '../open-ai/openai';
import { Storage } from '../storage/storage';
import { exec } from 'child_process';
import pushMessageToChat from '../../pushMessage';

export class DataSummarizeReport {
  public static async getAndSendSummarization(tracks: any[], searchKeywords: any[]) {
    const timeNormAsText = tracks.map((data) => `- ${(data.time_spent_sec / 3600).toFixed(2)} hours spent on ${data.name}`);
    const searxhNormAsText = searchKeywords.map((data) => `-- ${data.keyword}`);

    console.log(searxhNormAsText);

    const openAIInstance = new OpenAI().getInstance();

    const response = await openAIInstance.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content: `
          I want you to act as a good psychological consultant. I’ll write you my activity log, and you’ll suggest a summary action and suggestion in case of exceeding the time spent for me to help me estimate my mental health. In some cases, I will also tell you my personal data of roles. You will also suggest the activity recommendation or suitable actions to help me avoid the mental issues. And after your suggestion please also echo the activities log with exact time spent that i've sent back again and given them the date of ${
            tracks[0].datetime_trunc
          }
          

          the activity logs are

          ${timeNormAsText.join('\n')}

          ${
            searchKeywords.length
              ? `
            with these searches on google

            ${searxhNormAsText}
          `
              : ``
          }

          `,
        },
      ],
    });
    const message: any = response.data.choices[0].message?.content;
    pushMessageToChat(message); // probably message size too large <must chunk and send multiple time
  }

  public static async getNotificationAlert() {
    const trackedData = await Storage.getTodayTrackedData();

    const timeNormAsText = trackedData.map((data) => `- ${(data.time_spent_sec / 3600).toFixed(2)} hours spent on ${data.name}`);

    const openAIInstance = new OpenAI().getInstance();
    const response = await openAIInstance.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.Assistant,
          content: `
          I want you to act as a good psychological messenger. I’ll write you my activity log, and you’ll suggest a short message as a notification in case of exceeding the time spent for me to help me estimate my mental health. In some cases, I will also tell you my activity log. You will also suggest the short message to recommend the suitable actions to help me avoid the mental issues. and if I don't have thing to worry please just send me back a good cheers. and please respond me back without the special character or any quotes
            
  
            the activity logs are
  
            ${timeNormAsText.join('\n')}
  
            `,
        },
      ],
    });

    const title = 'Hey',
      subtitle = 'Titan',
      message = response.data.choices[0].message?.content.replace(/"/g, '\\"');

    const script = 'display notification "' + message + '" with title "' + title + '" subtitle "' + subtitle + '"';

    // Use the child_process module to run the AppleScript
    exec("osascript -e '" + script + "'", function (error, stdout, stderr) {
      if (error) {
        console.error('Error displaying notification:', error);
      }
    });
  }
}
