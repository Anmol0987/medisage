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
    cleaned = cleaned
        .replace(/^```(?:\w+)?/, "")
        .replace(/```$/, "")
        .trim();
    return cleaned;
}
