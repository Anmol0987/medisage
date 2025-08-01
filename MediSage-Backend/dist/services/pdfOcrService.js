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
exports.extractTextFromPdf = void 0;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const pdf2pic_1 = require("pdf2pic");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const imageOcrService_1 = require("./imageOcrService");
const imageSharp_1 = require("./imageSharp");
// Text-layer extraction for digital PDFs
const extractTextLayer = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const buffer = fs_1.default.readFileSync(filePath);
    const data = yield (0, pdf_parse_1.default)(buffer);
    return (data.text || "").trim();
});
// OCR for scanned PDFs
const extractTextFromScannedPdf = (pdfPath_1, ...args_1) => __awaiter(void 0, [pdfPath_1, ...args_1], void 0, function* (pdfPath, maxPagesToProcess = 3) {
    const totalPages = yield getPdfPageCount(pdfPath);
    const pagesToProcess = Math.min(totalPages, maxPagesToProcess);
    console.log(`PDF has ${totalPages} pages, processing first ${pagesToProcess}`);
    const tempDir = path_1.default.join(path_1.default.dirname(pdfPath), "tmp_" + Date.now());
    fs_1.default.mkdirSync(tempDir);
    let combinedText = "";
    try {
        for (let p = 1; p <= pagesToProcess; p++) {
            const options = {
                density: 300,
                saveFilename: `page-${p}`,
                savePath: tempDir,
                format: "png",
                width: 1200,
                height: 1600,
            };
            const convert = (0, pdf2pic_1.fromPath)(pdfPath, options);
            const result = yield convert(p);
            const processedImagePath = yield (0, imageSharp_1.preprocessImage)(result.path);
            const imagePath = typeof processedImagePath === "string"
                ? processedImagePath
                : result.path;
            const pageText = yield (0, imageOcrService_1.extractTextFromImage)(imagePath);
            console.log("pagetext", pageText);
            combinedText += "\n" + pageText;
            // if (fs.existsSync(result.path)) {
            //   fs.unlinkSync(result.path);
            // }
        }
    }
    finally {
        // if (fs.existsSync(tempDir)) {
        //   fs.rmSync(tempDir, { recursive: true, force: true });
        // }
    }
    return combinedText.trim();
});
const getPdfPageCount = (pdfPath) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const buffer = fs_1.default.readFileSync(pdfPath);
        const data = yield (0, pdf_parse_1.default)(buffer);
        return data.numpages;
    }
    catch (error) {
        console.error("Could not determine page count, defaulting to 1");
        return 1;
    }
});
// Main PDF processor
const extractTextFromPdf = (pdfPath_1, ...args_1) => __awaiter(void 0, [pdfPath_1, ...args_1], void 0, function* (pdfPath, minLength = 50) {
    const textLayer = yield extractTextLayer(pdfPath);
    if (textLayer.length >= minLength)
        return textLayer;
    return yield extractTextFromScannedPdf(pdfPath, 3);
});
exports.extractTextFromPdf = extractTextFromPdf;
