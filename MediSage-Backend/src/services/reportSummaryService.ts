import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const generateMedicalReportSummary = async (
  extractedText: string,
  language: string = "en"
): Promise<string | null> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
    Analyze the following medical report text and provide a clear, concise summary suitable for a patient in ${
      language === "hi" ? "Hindi and English" : "English"
    }.

Medical report text:
"""
${extractedText}
"""

Please format your response as valid JSON with the following fields:
{
  "summary": "A brief explanation of the report in simple language (2-4 sentences).",
  "abnormal Findings": [
    "List key abnormal values or findings, if any (or an empty list if none)."
  ],
  "recommendations": "Suggested next steps or advice for the patient.",
  "disclaimer": "A statement advising the patient to consult a healthcare professional."
}
Make sure:
- The JSON is well-formed.
- Use clear and simple language.
- Provide concise answers.
- If there are no abnormal findings, return an empty array for that field.
- Do not include any text outside the JSON object.
`;

    const result = await model.generateContent(prompt);
    const responseText = await result.response.text();
    console.log("AIresponse", responseText);
    const cleanText = cleanGeminiJson(responseText);
    const cleanObject = JSON.parse(cleanText);
    return cleanObject;
  } catch (error) {
    console.error("Gemini summary error:", error);
    return null;
  }
};
function cleanGeminiJson(text: string): string {
  let cleaned = text.trim();

  // Regex to remove markdown fences like ```json ... ```
  cleaned = cleaned
    .replace(/^```(?:\w+)?/, "")
    .replace(/```$/, "")
    .trim();

  return cleaned;
}
