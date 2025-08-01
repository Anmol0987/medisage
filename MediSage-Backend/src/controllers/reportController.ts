import { Request, Response } from "express";
import { extractTextFromFile } from "../services/ocrService";
import fs from "fs";
import { generateMedicalReportSummary } from "../services/reportSummaryService";

export const uploadReport = async (req: Request, res: Response) => {
  let filePath: string | null = null;

  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    const file = req.file;
    filePath = file.path;

    console.log("file-----", file);
    console.log("filePath-----", filePath);

    const extractedText = await extractTextFromFile(filePath, file.mimetype);
    const summary = await generateMedicalReportSummary(extractedText);
    // Delete the uploaded file after processing
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
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
  } catch (error: any) {
    console.error("Upload processing error:", error);

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return res.status(500).json({
      error: "Failed to process file",
      message: error.message,
    });
  }
};
