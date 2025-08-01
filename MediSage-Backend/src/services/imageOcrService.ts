import Tesseract from "tesseract.js";
import { preprocessImage } from "./imageSharp";
import cleanExtractedText from "../utils/TextCleanUp";

export const extractTextFromImage = async (
  filePath: string
): Promise<string> => {
  try {
    console.log(`Starting OCR for image: ${filePath}`);
    const imageBuffer = await preprocessImage(filePath);
    const response = await Tesseract.recognize(imageBuffer, "eng", {
      logger: (m) => console.log(m),
    });
    const { text } = response.data;
    console.log("imagetext", text);
    return cleanExtractedText(text);
  } catch (error) {
    console.error("OCR extraction failed:", error);
    throw new Error("Failed to extract text from image");
  }
};

