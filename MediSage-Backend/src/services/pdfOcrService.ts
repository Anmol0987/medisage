import pdfParse from "pdf-parse";
import { fromPath } from "pdf2pic";
import path from "path";
import fs from "fs";
import { extractTextFromImage } from "./imageOcrService";
import { preprocessImage } from "./imageSharp";

// Text-layer extraction for digital PDFs
const extractTextLayer = async (filePath: string): Promise<string> => {
  const buffer = fs.readFileSync(filePath);
  const data = await pdfParse(buffer);
  return (data.text || "").trim();
};

// OCR for scanned PDFs
const extractTextFromScannedPdf = async (
  pdfPath: string,
  maxPagesToProcess = 3
): Promise<string> => {
  const totalPages = await getPdfPageCount(pdfPath);
  const pagesToProcess = Math.min(totalPages, maxPagesToProcess);
  console.log(
    `PDF has ${totalPages} pages, processing first ${pagesToProcess}`
  );
  const tempDir = path.join(path.dirname(pdfPath), "tmp_" + Date.now());
  fs.mkdirSync(tempDir);

  let combinedText = "";
  try {
    for (let p = 1; p <= pagesToProcess; p++) {
      const options = {
        density: 300,
        saveFilename: `page-${p}`,
        savePath: tempDir,
        format: "png" as const,
        width: 1200,
        height: 1600,
      };

      const convert = fromPath(pdfPath, options);
      const result = await convert(p);
      const processedImagePath = await preprocessImage(result.path);
      const imagePath =
        typeof processedImagePath === "string"
          ? processedImagePath
          : result.path;
      const pageText = await extractTextFromImage(imagePath);
      console.log("pagetext", pageText);
      combinedText += "\n" + pageText;

      if (fs.existsSync(result.path)) {
        fs.unlinkSync(result.path);
      }
    }
  } finally {
    if (fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  }

  return combinedText.trim();
};
const getPdfPageCount = async (pdfPath: string): Promise<number> => {
  try {
    const buffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(buffer);
    return data.numpages;
  } catch (error) {
    console.error("Could not determine page count, defaulting to 1");
    return 1;
  }
};

// Main PDF processor
export const extractTextFromPdf = async (
  pdfPath: string,
  minLength = 50
): Promise<string> => {
  const textLayer = await extractTextLayer(pdfPath);
  if (textLayer.length >= minLength) return textLayer;
  return await extractTextFromScannedPdf(pdfPath, 3);
};
