
import { GoogleGenAI, Type } from "@google/genai";

// Fix: Always use the prescribed initialization format with process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const geminiService = {
  async getPostSuggestions(topic: string) {
    try {
      // Fix: Use gemini-3-flash-preview for general text tasks as per guidelines.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a social media strategist for TimFrancis. The user wants to post about: "${topic}". Suggest 3 variations of engaging posts with hashtags.`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "Could not generate suggestions at this time.";
    }
  },

  async analyzeEngagement(data: any) {
    try {
      // Fix: Use gemini-3-pro-preview for complex reasoning and data analysis tasks.
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Analyze this engagement data and provide 3 actionable tips for growth: ${JSON.stringify(data)}`,
      });
      return response.text;
    } catch (error) {
      return "Error analyzing data.";
    }
  },

  async smartSearch(query: string) {
    try {
      // Fix: Use gemini-3-flash-preview for simple text Q&A tasks.
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `The user is searching for "${query}" on a professional social network. Identify the key intent and suggest 3 content categories or user types they might be looking for.`,
      });
      return response.text;
    } catch (error) {
      return "";
    }
  }
};
