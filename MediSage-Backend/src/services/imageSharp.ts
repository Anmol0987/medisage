import sharp from "sharp";

export const preprocessImage = async (filePath: string): Promise<Buffer> => {
  const outputPath = filePath.replace(
    /\.(jpg|jpeg|png)$/i,
    "_preprocessed.png"
  );

  const image = sharp(filePath);
  const metadata = await image.metadata();
  const zoomFactor = 1.2;
  const cropWidth = Math.floor(metadata.width! / zoomFactor);
  const cropHeight = Math.floor(metadata.height! / zoomFactor);
  const left = Math.floor((metadata.width! - cropWidth) / 2);
  const top = Math.floor((metadata.height! - cropHeight) / 2);

  const pipeline = image
    .extract({ width: cropWidth, height: cropHeight, left, top })
    .resize({ width: metadata.width, height: cropHeight })
    .greyscale()
    .normalize()
    .modulate({
      brightness: 1.2,
      saturation: 0.0,
    })
    .linear(1.1, -20)
    .threshold(100)
    .sharpen();

  await pipeline.clone().toFile(outputPath);
  console.log("Processed image saved at:", outputPath);

  return await pipeline.toBuffer();
};
