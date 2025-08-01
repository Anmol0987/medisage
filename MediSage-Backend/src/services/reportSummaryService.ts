import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
export const generateMedicalReportSummary = async (
  extractedText: string,
  language: string = "en"
): Promise<string | null> => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `
You are MedBot, an AI doctor. Act as a caring, knowledgeable digital physician for the patient.

Analyze the following medical report text and create a detailed, patient-friendly JSON response in ${
      language === "hi" ? "Hindi and English" : "English"
    }.

Medical report text:
"""
${extractedText}
"""

Please do the following:
1. As a virtual doctor, extract and list all available test values (with units and reference ranges if present), sorted as they appear in the report.
2. Clearly mark (for example, 'abnormal: true' or by labeling) which results are abnormal based on reference ranges.
3. After the table, generate a JSON object using these fields:
{
  "extractedValues": [
    {"test": "Test Name", "value": "Result", "unit": "Unit", "referenceRange": "Range", "abnormal": true/false}
    // ...list all tests found
  ],
  "summary": "A clear, doctor-style, patient-friendly explanation of the report in 2-4 sentences.",
  "abnormalFindings": [
    "Highlight key abnormal results and what they mean for the patient, or [] if none."
  ],
  "recommendations": "Doctor’s advice: If results are all normal, say 'Your test results are all within normal limits—there’s no cause to worry, and there’s no need to visit a doctor for these results unless you have symptoms.' Suggest hydration, rest, or basic OTC advice if relevant. If significant abnormalities are present, advise seeing a doctor.",
  "disclaimer": "This is an AI-generated summary for information only and does not replace professional medical advice. Always consult a real healthcare professional for medical concerns or before taking medicines."
}

Instructions:
- Only output valid JSON using the exact key names above.
- Never include text outside the JSON object.
- Use a warm, supportive tone of a trustworthy doctor.
- In normal cases, strongly reassure: 'No cause for concern. No further action needed unless you feel symptoms.'
- In abnormal or ambiguous cases, highlight only the key points and urge appropriate real-world follow-up.
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
