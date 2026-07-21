import { GoogleGenAI } from "@google/genai";

function getAI() {

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {

        throw new Error(

            "GEMINI_API_KEY is missing in .env"

        );

    }

    return new GoogleGenAI({

        apiKey

    });

}

/*
|--------------------------------------------------------------------------
| Generate Complete MindMap
|--------------------------------------------------------------------------
*/

export async function generateMindMap(

    topic: string

) {

    const ai = getAI();

    const prompt = `
Generate a knowledge graph for the topic "${topic}".

IMPORTANT:

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT use \`\`\`.

Do NOT include explanations.

Return exactly:

{
  "root":"${topic}",
  "children":[
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

        throw new Error(

            "Gemini returned empty response."

        );

    }

    const cleaned = text

        .replace(/```json/gi, "")

        .replace(/```/g, "")

        .trim();

    try {

        return JSON.parse(cleaned);

    }

    catch {

        console.error(cleaned);

        throw new Error(

            "Gemini returned invalid JSON."

        );

    }

}

/*
|--------------------------------------------------------------------------
| Expand Existing Node
|--------------------------------------------------------------------------
*/

export async function expandNodeAI(

    topic: string

): Promise<string[]> {

    const ai = getAI();

    const prompt = `
The concept is:

"${topic}"

Generate exactly five immediate child concepts.

Rules:

Return ONLY valid JSON.

Do NOT use markdown.

Do NOT use explanations.

Return exactly:

{
    "children":[
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

        throw new Error(

            "Gemini returned empty response."

        );

    }

    const cleaned = text

        .replace(/```json/gi, "")

        .replace(/```/g, "")

        .trim();

    try {

        const json = JSON.parse(cleaned);

        if (!Array.isArray(json.children)) {

            throw new Error();

        }

        return json.children;

    }

    catch {

        console.error(cleaned);

        throw new Error(

            "Gemini returned invalid JSON."

        );

    }

}