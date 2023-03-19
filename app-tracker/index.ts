import { Configuration, OpenAIApi } from 'openai';

import * as dotenv from 'dotenv';
import OpenAI from './src/instances/open-ai/openai';
import { ChatCompletionRequestMessageRoleEnum } from 'openai';
import { ChromeHistoryReader } from './src/instances/chrome-history-reader/chrome-history-reader';
import { AppTracker } from './src/instances/app-tracker/app-tracker';

import { server } from './src/server';
import { Storage } from './src/instances/storage/storage';
import { DataSummarizeReport } from './src/instances/data-summarize-report';

dotenv.config(); // load the environment variables

const openAIInstance = new OpenAI().getInstance();

(async () => {
  // const response = await openAIInstance.createChatCompletion({
  //   model: "gpt-3.5-turbo",
  //   messages: [
  //     {
  //       role: ChatCompletionRequestMessageRoleEnum.Assistant,
  //       content: "Can you give the brief explanation of NoMachine concept",
  //     },
  //   ],
  // });

  // console.log(response.data.choices);

  //console.log(ChromeHistoryReader.getChromeSearchHistory());

  await Storage.initializeDatabase();

  setInterval(AppTracker.getCurrentFocusedApp, 1000);

  setInterval(Storage.proceedSummerizationReport.bind(Storage), 10000);
  //setInterval(DataSummarizeReport.getNotificationAlert, 2000);

  const PORT = 3000;

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();
