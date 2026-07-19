import { GoogleGenAI } from "@google/genai";

export async function generateMindMap(topic: string) {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is missing in .env");
    }

    const ai = new GoogleGenAI({
        apiKey
    });

    const prompt = `
Generate a knowledge graph for the topic "${topic}".

IMPORTANT:
- Return ONLY valid JSON.
- Do NOT use markdown.
- Do NOT use \`\`\`json.
- Do NOT include explanations.

Return exactly this format:

{
  "root": "Topic",
  "children": [
    "Concept 1",
    "Concept 2",
    "Concept 3",
    "Concept 4",
    "Concept 5"
  ]
}
`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
    });

    const text = response.text;

    if (!text) {
        throw new Error("Gemini returned an empty response.");
    }

    // Remove markdown code fences if Gemini still returns them
    const cleaned = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();

    try {

        return JSON.parse(cleaned);

    } catch (error) {

        console.error("Invalid JSON from Gemini:");
        console.error(cleaned);

        throw new Error("Gemini returned invalid JSON.");

    }
}