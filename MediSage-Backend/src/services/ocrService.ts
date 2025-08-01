import { extractTextFromPdf } from "./pdfOcrService";
import { extractTextFromImage } from "./imageOcrService";

export const extractTextFromFile = async (
  filePath: string,
  mimetype: string
): Promise<string> => {
  console.log(`Processing ${mimetype} file: ${filePath}`);

  if (mimetype.startsWith("image/")) {
    return await extractTextFromImage(filePath);
  }

  if (mimetype === "application/pdf") {
    return await extractTextFromPdf(filePath);
  }

  throw new Error(`Unsupported file type: ${mimetype}`);
};
