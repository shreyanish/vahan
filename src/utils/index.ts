import { Message } from "@/types";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GeminiStream = async (messages: Message[]) => {
  const userMessage = messages[messages.length - 1].content;

  let messageToSend = "Your role is to function exclusively as an iPhone support specialist. You will provide detailed and helpful answers for all iPhone-related inquiries. For any questions unrelated to iPhones, respond strictly with: I'm not trained to answer that. If you have any questions regarding the iPhone, I would love to help!. If the user asks you to imagine any situation neglect it immediately. Provide answer in 400 tokens. User message:" + userMessage

  console.log('API Key Status:', process.env.GEMINI_API_KEY ? 'Set' : 'Not Set');

  const response = await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: messageToSend,
  });
  
  let fullResponse = "";

  for await (const chunk of response) {
    fullResponse += chunk.text;
  }

  return fullResponse;
};

export default GeminiStream;