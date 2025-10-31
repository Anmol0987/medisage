import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const generateMedicalReportSummary = async (
  extractedText: string,
  language: string = "en"
): Promise<string | null> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
You are MedBot, an AI doctor. Follow the examples and then process the new input.

Example 1:
Medical report text:
"""
Hemoglobin: 13.5 g/dL (Normal: 12–16)
WBC: 7200 /µL (Normal: 4000–11000)
Platelets: 250,000 /µL (Normal: 150,000–450,000)
"""
Output:
{
  "reportName": "Complete Blood Count",
  "extractedValues": [
    {"test": "Hemoglobin", "value": "13.5", "unit": "g/dL", "referenceRange": "12–16", "abnormal": false},
    {"test": "WBC", "value": "7200", "unit": "/µL", "referenceRange": "4000–11000", "abnormal": false},
    {"test": "Platelets", "value": "250,000", "unit": "/µL", "referenceRange": "150,000–450,000", "abnormal": false}
  ],
  "summary": "All parameters are within normal range.",
  "abnormalFindings": [],
  "recommendations": "Your test results are all within normal limits—no cause for concern.",
  "disclaimer": "AI-generated summary. Consult your doctor if unsure."
}

Now process the following:
Medical report text:
"""
${extractedText}
"""
Return JSON only.
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

  cleaned = cleaned
    .replace(/^```(?:\w+)?/, "")
    .replace(/```$/, "")
    .trim();

  return cleaned;
}
