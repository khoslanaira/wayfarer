import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || "dummy_key");
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export const generateItinerary = async (objectives) => {
  const prompt = `
You are a travel itinerary expert. Generate a JSON travel itinerary based on these objectives: "${objectives}".

The JSON must follow this exact structure:
{
  "destination": "City Name",
  "summary": "Short summary",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "activities": [
        {
          "time": "HH:MM AM/PM",
          "title": "Activity Title",
          "description": "Short description",
          "type": "transport|activity|dining|accommodation"
        }
      ]
    }
  ]
}

Only return valid JSON without Markdown blocks or any other text.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    let jsonStr = responseText.replace(/```json\n?/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to generate itinerary. " + error.message);
  }
};

export const patchItinerary = async (currentItinerary, constraint) => {
  const prompt = `
A disruption of type "${constraint}" has occurred. Re-plan only the affected item in this JSON: ${JSON.stringify(currentItinerary)}. Return ONLY valid JSON without Markdown blocks.
`;

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    let jsonStr = responseText.replace(/```json\n?/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error patching itinerary:", error);
    throw new Error("Failed to patch itinerary. " + error.message);
  }
};
