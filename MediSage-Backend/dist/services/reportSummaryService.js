"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMedicalReportSummary = void 0;
const generative_ai_1 = require("@google/generative-ai");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generateMedicalReportSummary = (extractedText_1, ...args_1) => __awaiter(void 0, [extractedText_1, ...args_1], void 0, function* (extractedText, language = "en") {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
    Analyze the following medical report text and provide a clear, concise summary suitable for a patient in ${language === "hi" ? "Hindi and English" : "English"}.

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
        const result = yield model.generateContent(prompt);
        const responseText = yield result.response.text();
        console.log("AIresponse", responseText);
        const cleanText = cleanGeminiJson(responseText);
        const cleanObject = JSON.parse(cleanText);
        return cleanObject;
    }
    catch (error) {
        console.error("Gemini summary error:", error);
        return null;
    }
});
exports.generateMedicalReportSummary = generateMedicalReportSummary;
function cleanGeminiJson(text) {
    let cleaned = text.trim();
    // Regex to remove markdown fences like ```json ... ```
    cleaned = cleaned
        .replace(/^```(?:\w+)?/, "")
        .replace(/```$/, "")
        .trim();
    return cleaned;
}
