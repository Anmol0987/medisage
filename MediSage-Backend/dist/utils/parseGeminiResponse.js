"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parsedResponse = exports.parseGeminiResponse = void 0;
const parseGeminiResponse = (geminiText) => {
    try {
        console.log("parseGeminiResponse received:", typeof geminiText);
        let textContent;
        if (typeof geminiText === "string") {
            textContent = geminiText;
        }
        else {
            console.error("Invalid Gemini response format:", typeof geminiText);
            return null;
        }
        let cleanText = textContent.trim();
        if (cleanText.startsWith("```")) {
            cleanText = cleanText.replace(/^```json\s*/, "").replace(/\s*`````$/, "");
        }
        else if (cleanText.startsWith("```")) {
            cleanText = cleanText.replace(/^``````$/gm, "");
        }
        cleanText = cleanText.replace(/^`+|`+$/g, "").trim();
        if (cleanText.trim().startsWith("{")) {
            try {
                const parsed = JSON.parse(cleanText);
                console.log("Successfully parsed JSON:", Object.keys(parsed));
                return validateAndFormat(parsed);
            }
            catch (parseError) {
                console.error("JSON parse error:", parseError);
                console.error("Text that failed to parse:", cleanText.substring(0, 500));
            }
        }
        console.log("Falling back to unstructured parsing");
        return parseUnstructuredResponse(cleanText);
    }
    catch (error) {
        console.error("Failed to parse Gemini response:", error);
        return null;
    }
};
exports.parseGeminiResponse = parseGeminiResponse;
const validateAndFormat = (data) => {
    var _a, _b, _c;
    console.log("Validating and formatting ", Object.keys(data));
    return {
        name: data.name || data.medicineName || "Unknown",
        genericName: data.genericName || data.generic_name || null,
        brandNames: Array.isArray(data.brandNames) ? data.brandNames : [],
        manufacturer: data.manufacturer || null,
        price: data.price || "0",
        description: data.description || data.summary || "",
        usage: data.usage || data.indications || data.uses || "",
        sideEffects: data.sideEffects || data.side_effects || data.adverseReactions || "",
        idealTiming: data.idealTiming || data.ideal_timing || data.timing || "",
        warnings: data.warnings || data.contraindications || data.precautions || "",
        scheduleType: data.scheduleType || data.schedule_type || null,
        prescriptionRequired: (_b = (_a = data.prescriptionRequired) !== null && _a !== void 0 ? _a : data.prescription_required) !== null && _b !== void 0 ? _b : true,
        ayushApproved: (_c = data.ayushApproved) !== null && _c !== void 0 ? _c : false,
        language: data.language || "en",
    };
};
const parseUnstructuredResponse = (text) => {
    const extractField = (pattern, defaultValue = "") => {
        const match = text.match(pattern);
        return match ? match[1].trim() : defaultValue;
    };
    return {
        name: extractField(/(?:Name|Medicine|Drug):\s*([^\n]+)/i, "Unknown"),
        genericName: extractField(/Generic Name:\s*([^\n]+)/i) || null,
        brandNames: [],
        manufacturer: null,
        price: null,
        description: extractField(/(?:Description|Summary):\s*([^\n]+)/i),
        usage: extractField(/(?:Usage|Uses|Indications):\s*([^\n]+)/i),
        sideEffects: extractField(/Side Effects?:\s*([^\n]+)/i),
        idealTiming: extractField(/(?:Timing|When to take):\s*([^\n]+)/i),
        warnings: extractField(/(?:Warnings|Precautions):\s*([^\n]+)/i),
        scheduleType: null,
        prescriptionRequired: /prescription.{0,10}required/i.test(text),
        ayushApproved: false,
        language: "en",
    };
};
const parsedResponse = (modelText) => {
    try {
        return null;
    }
    catch (error) {
        return null;
    }
};
exports.parsedResponse = parsedResponse;
