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
const isValidReportSummary_1 = require("../utils/isValidReportSummary");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const generateMedicalReportSummary = (extractedText_1, ...args_1) => __awaiter(void 0, [extractedText_1, ...args_1], void 0, function* (extractedText, language = "en") {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
        const prompt = `
    You are **MedBot**, a professional AI clinical report summarizer designed for healthcare applications.  
    Your task is to accurately interpret medical report text and generate **structured JSON output** following the schema below — with zero deviation.
    
    ---------------------------
    STRICT OUTPUT REQUIREMENTS
    ---------------------------
    - Output **MUST** be valid JSON.
    - **No markdown**, no comments, no explanations — only JSON.
    - **All keys and values must match exactly** with the schema.
    - **All arrays must be well-formed**, even if empty.
    - **No nulls, no missing keys, no extra keys**.
    - The output must always be **syntactically valid JSON** ready for direct parsing.
    
    ---------------------------
    OUTPUT JSON SCHEMA
    ---------------------------
    {
      "reportName": string,                          // Example: "Liver Function Test"
      "extractedValues": [
        {
          "test": string,                            // Example: "ALT (SGPT)"
          "value": string,                           // Numeric or text value extracted
          "unit": string,                            // Example: "U/L" or ""
          "referenceRange": string,                  // Example: "10–40"
          "abnormal": boolean                        // true if value outside reference range or clinically flagged
        }
      ],
      "summary": string,                             // Concise, medical-grade summary of overall findings
      "abnormalFindings": [
        {
          "test": string,                            // Name of test
          "finding": string                          // Specific interpretation, e.g., "Elevated liver enzyme indicating hepatic stress"
        }
      ],
      "recommendations": string,                     // Next steps in neutral medical language
      "disclaimer": "AI-generated summary. Consult your physician for clinical interpretation."
    }
    
    ---------------------------
    STRICT RULES
    ---------------------------
    1. **Always** provide all top-level fields, even if empty.
    2. "abnormalFindings" must **always** be an array of objects with "test" and "finding" keys — never strings.
    3. "abnormal" in extractedValues must be **true** only if:
       - The value clearly falls outside the reference range, OR
       - The term "high", "low", "elevated", "decreased", "positive", or "abnormal" appears near the test.
    4. Use **concise, accurate, professional medical phrasing**.
    5. "summary" should be a **neutral clinical interpretation** — not emotional or overly optimistic.
    6. "recommendations" must **not** give prescriptions or treatments — only general follow-ups like “Consult a physician for further evaluation”.
    7. Units, numbers, and reference ranges must be preserved exactly as found in the report.
    8. If the report type is not explicitly stated, infer it from common tests (e.g., Hemoglobin/WBC → "Complete Blood Count").
    9. Handle missing or partial data gracefully — never leave empty strings unless unavoidable.
    
    ---------------------------
    EXAMPLE
    ---------------------------
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
      "summary": "All hematological parameters are within normal reference limits.",
      "abnormalFindings": [],
      "recommendations": "No abnormal findings detected. Continue routine health monitoring.",
      "disclaimer": "AI-generated summary. Consult your physician for clinical interpretation."
    }
    
    ---------------------------
    NOW PROCESS THE FOLLOWING:
    ---------------------------
    Medical report text:
    """
    ${extractedText}
    """
    
    Return JSON only — no markdown, no explanation, no additional text.
    `;
        const result = yield model.generateContent(prompt);
        const responseText = result.response.text();
        console.log("AIresponse", responseText);
        const cleanText = cleanGeminiJson(responseText);
        //type assertion
        const cleanObject = JSON.parse(cleanText);
        if ((0, isValidReportSummary_1.isValidReportSummary)(cleanObject)) {
            return cleanObject;
        }
        else {
            console.error("Invalid AI output shape:", cleanObject);
            return null;
        }
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
