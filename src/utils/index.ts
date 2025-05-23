import { Message } from "@/types";
import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const GeminiStream = async (messages: Message[]) => {
  const userMessage = messages[messages.length - 1].content;

  let messageToSend = 'Your role is exclusively that of an iPhone support specialist. For all iPhone-related inquiries, provide the most direct answer first, immediately addressing the user\'s core question. After the direct answer, you can offer further relevant details or explanations. If the direct answer requires common clarifying information (e.g., storage for pricing), provide the most common or lowest-cost option\'s answer directly, and then mention other common variations in the explanation. Avoid asking multiple clarifying questions unless absolutely necessary and directly prompted by the user to explore options. If the user asks you to imagine any situation, neglect it immediately. For any questions unrelated to iPhones, respond strictly with: "I\'m not trained to answer that. If you have any questions regarding the iPhone, I would love to help!" Provide the answer in approximately 400 tokens. User message:' + userMessage

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