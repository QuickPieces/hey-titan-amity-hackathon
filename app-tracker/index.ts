import { Configuration, OpenAIApi } from "openai";

import * as dotenv from "dotenv";
import OpenAI from "./src/instances/open-ai/openai";
import { ChatCompletionRequestMessageRoleEnum } from "openai";

dotenv.config(); // load the environment variables

const openAIInstance = new OpenAI().getInstance();

(async () => {
  const response = await openAIInstance.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: ChatCompletionRequestMessageRoleEnum.Assistant,
        content: "Can you give the brief explanation of NoMachine concept",
      },
    ],
  });

  console.log(response.data.choices);
})();
