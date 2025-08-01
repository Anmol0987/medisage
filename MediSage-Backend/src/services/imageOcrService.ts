import { createWorker, PSM } from "tesseract.js";
import { preprocessImage } from "./imageSharp";
import cleanExtractedText from "../utils/TextCleanUp";

export const extractTextFromImage = async (
  filePath: string
): Promise<string> => {
  try {
    console.log(`Starting OCR for image: ${filePath}`);
    const imageBuffer = await preprocessImage(filePath);
    const worker = await createWorker("eng", 1);

    await worker.setParameters({
      tessedit_char_whitelist:
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%/.-:,",
      preserve_interword_spaces: "1",
      tessedit_pageseg_mode: PSM.SPARSE_TEXT,
    });

    const {
      data: { text },
    } = await worker.recognize(imageBuffer);

    await worker.terminate();
    console.log("imagetext", text);
    return cleanExtractedText(text);
  } catch (error) {
    console.error("OCR extraction failed:", error);
    throw new Error("Failed to extract text from image");
  }
};
