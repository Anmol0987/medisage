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
exports.uploadReport = void 0;
const ocrService_1 = require("../services/ocrService");
const fs_1 = __importDefault(require("fs"));
const reportSummaryService_1 = require("../services/reportSummaryService");
const uploadReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let filePath = null;
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const file = req.file;
        filePath = file.path;
        console.log("file-----", file);
        console.log("filePath-----", filePath);
        const extractedText = yield (0, ocrService_1.extractTextFromFile)(filePath, file.mimetype);
        const summary = yield (0, reportSummaryService_1.generateMedicalReportSummary)(extractedText);
        // Delete the uploaded file after processing
        if (fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
        return res.json({
            success: true,
            data: {
                originalFileName: file.originalname,
                fileSize: file.size,
                fileType: file.mimetype,
                extractedText,
                textLength: extractedText.length,
                AISummary: summary,
            },
        });
    }
    catch (error) {
        console.error("Upload processing error:", error);
        if (filePath && fs_1.default.existsSync(filePath)) {
            fs_1.default.unlinkSync(filePath);
        }
        return res.status(500).json({
            error: "Failed to process file",
            message: error.message,
        });
    }
});
exports.uploadReport = uploadReport;
