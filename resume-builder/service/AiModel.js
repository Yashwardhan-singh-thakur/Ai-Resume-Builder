import { GoogleGenAI, Type } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = new GoogleGenAI({ apiKey: apiKey });

// genrating ai summary for resume builder
const summarySchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      level: {
        type: "string",
        enum: ["Fresher", "Mid Level", "Experienced"],
      },
      summary: {
        type: "string",
      },
    },
    required: ["level", "summary"],
  },
};

export async function genSummeryAiModel(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: summarySchema,
    },
  });
  return response.text;
}

// genrating ai summary for experience section

const experienceSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.STRING,
  },
};

export async function genExperienceAiModel(prompt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: experienceSchema,
    },
  });

  return JSON.parse(response.text);
}
