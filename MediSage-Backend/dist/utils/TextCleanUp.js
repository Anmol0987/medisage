"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cleanExtractedText(text) {
    return text
        .replace(/[^\x00-\x7F]/g, "")
        .replace(/\s{2,}/g, " ")
        .replace(/[_~*|#^]/g, "")
        .trim();
}
exports.default = cleanExtractedText;
