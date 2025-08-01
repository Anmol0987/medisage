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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTextFromImage = void 0;
const tesseract_js_1 = __importDefault(require("tesseract.js"));
const imageSharp_1 = require("./imageSharp");
const TextCleanUp_1 = __importDefault(require("../utils/TextCleanUp"));
const extractTextFromImage = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`Starting OCR for image: ${filePath}`);
        const imageBuffer = yield (0, imageSharp_1.preprocessImage)(filePath);
        const response = yield tesseract_js_1.default.recognize(imageBuffer, "eng", {
            logger: (m) => console.log(m),
        });
        const { text } = response.data;
        console.log("imagetext", text);
        return (0, TextCleanUp_1.default)(text);
    }
    catch (error) {
        console.error("OCR extraction failed:", error);
        throw new Error("Failed to extract text from image");
    }
});
exports.extractTextFromImage = extractTextFromImage;
