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
exports.searchIndianMedicineByAi = void 0;
// src/services/medicineService.ts
const generative_ai_1 = require("@google/generative-ai");
const generateAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const searchIndianMedicineByAi = (name) => __awaiter(void 0, void 0, void 0, function* () {
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
  "price": "price in INR ",
  "description": "brief description (max 50 words)",
  "usage": "how to take (max 30 words)",
  "sideEffects": "main side effects (max 25 words)",
  "idealTiming": "when to take (max 15 words)",
  "warnings": "key warnings only (max 20 words)",
  "prescriptionRequired": true/false
  "ayushApproved": true/false,
}

Keep all fields concise. No markdown formatting. Start response with { and end with }.
`;
        const result = yield model.generateContent(prompt);
        const response = yield result.response;
        const responseText = response.text();
        const cleanObject = JSON.parse(responseText);
        console.log("ai Object", cleanObject);
        return cleanObject;
    }
    catch (error) {
        return null;
    }
});
exports.searchIndianMedicineByAi = searchIndianMedicineByAi;
