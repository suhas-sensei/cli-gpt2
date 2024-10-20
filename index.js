require('dotenv').config();
const axios = require("axios");
const readlineSync = require("readline-sync");

const apiKey = process.env.HUGGING_FACE_API_KEY;

const apiEndpoint = "https://api-inference.huggingface.co/models/gpt2";

async function getResponse(prompt) {
  try {
    const response = await axios.post(
      apiEndpoint,
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    const generatedText = response.data[0].generated_text;
    return generatedText;
  } catch (error) {
    console.error("Error generating response:", error.response.data);
    return "Sorry, there was an error. Please try again.";
  }
}

async function startChatbot() {
  console.log('Welcome to the GPT-2 CLI Chatbot! Type "exit" to quit.');

  while (true) {
    const userInput = readlineSync.question("You: ");

    if (userInput.toLowerCase() === "exit") {
      console.log("Goodbye!");
      break;
    }

    console.log("GPT-2 is thinking...");

    const gpt2Response = await getResponse(userInput);

    console.log(`GPT-2: ${gpt2Response}`);
  }
}

startChatbot();
