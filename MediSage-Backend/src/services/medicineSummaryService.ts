import { GoogleGenerativeAI } from "@google/generative-ai";
import { Medicine, Prisma } from "@prisma/client";
import { getImageFromPrompt } from "./getImageFromPrompt";

const generateAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export type MedicineCreateData = Prisma.MedicineCreateInput;

export const searchIndianMedicineByAi = async (
  name: string
): Promise<MedicineCreateData | null> => {
  try {
    console.log("inside search");
    const model = generateAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
Provide concise medicine information for "${name}" in Indian context.
Return ONLY valid JSON (no markdown, no extra text):

{
  "name": "medicine name",
  "genericName": "generic name or null",
  "brandNames": ["brand1", "brand2"],
  "manufacturer": "manufacturer name or null",
  "price": "price in INR",
  "description": "brief description (max 50 words)",
  "usage": "how to take (max 30 words)",
  "sideEffects": "main side effects (max 25 words)",
  "idealTiming": "when to take (max 15 words)",
  "warnings": "key warnings only (max 20 words)",
  "prescriptionRequired": true/false,
  "ayushApproved": true/false,
  "imagePrompt": ""Concise, clear visual description of the medicine or medical item suitable for generating or searching a realistic stock photo (e.g., 'close-up of a strip of Dolo 650 tablets in white and blue packaging on a clean background, medical photography style').""
}

Keep all fields concise. No markdown formatting. Start response with { and end with }.
`;
    const result = await model.generateContent(prompt);

    const response = await result.response;
    const responseText = response.text();
    const cleanObject: MedicineCreateData = JSON.parse(responseText);
    console.log("ai Object", cleanObject.imagePrompt);
    
    // if (cleanObject.imagePrompt) {
    //   const imageUrl = await getImageFromPrompt(cleanObject.imagePrompt);
    //   cleanObject.imageUrl = imageUrl || null;
    // }
    return cleanObject;
  } catch (error) {
    return null;
  }
};
