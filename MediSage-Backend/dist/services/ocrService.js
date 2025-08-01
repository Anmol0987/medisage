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
exports.extractTextFromFile = void 0;
const pdfOcrService_1 = require("./pdfOcrService");
const imageOcrService_1 = require("./imageOcrService");
const extractTextFromFile = (filePath, mimetype) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Processing ${mimetype} file: ${filePath}`);
    if (mimetype.startsWith("image/")) {
        return yield (0, imageOcrService_1.extractTextFromImage)(filePath);
    }
    if (mimetype === "application/pdf") {
        return yield (0, pdfOcrService_1.extractTextFromPdf)(filePath);
    }
    throw new Error(`Unsupported file type: ${mimetype}`);
});
exports.extractTextFromFile = extractTextFromFile;
