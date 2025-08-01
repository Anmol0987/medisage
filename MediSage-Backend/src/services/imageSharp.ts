import sharp from "sharp";

export const preprocessImage = async (filePath: string): Promise<Buffer> => {
  return await sharp(filePath)
    .grayscale()
    .normalize()
    .threshold(180) 
    .toBuffer();
};
