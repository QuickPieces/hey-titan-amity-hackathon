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

(async () => {
  await Storage.initializeDatabase();

  setInterval(AppTracker.getCurrentFocusedApp, 1000);
  setInterval(Storage.proceedSummerizationReport.bind(Storage), 20000);
  setInterval(DataSummarizeReport.getNotificationAlert, 3600000);

  const PORT = 3000;

  server.listen(PORT, () => {
    console.log(`HeyTitan! has been successfully started at port: ${PORT}`);
  });
})();
