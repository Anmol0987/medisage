import sharp from "sharp";

export const preprocessImage = async (filePath: string): Promise<Buffer> => {
  console.log("inside");
  const outputPath = filePath.replace(
    /\.(jpg|jpeg|png)$/i,
    "_preprocessed.png"
  );

  const image = sharp(filePath);
  const metadata = await image.metadata();

  const cropMarginPercent = 0.05;
  const cropLeft = Math.floor(metadata.width! * cropMarginPercent);
  const cropTop = Math.floor(metadata.height! * cropMarginPercent);
  const cropWidth = Math.floor(metadata.width! - 2 * cropLeft);
  const cropHeight = Math.floor(metadata.height! - 2 * cropTop);

  const pipeline = image
    .extract({
      width: cropWidth,
      height: cropHeight,
      left: cropLeft,
      top: cropTop,
    })
    .greyscale()
    .normalize()
    .modulate({
      brightness: 1.1,
      saturation: 0.0,
    })
    .linear(1.1, -20)
    .threshold(100)
    .sharpen();

  await pipeline.clone().toFile(outputPath);
  console.log("Processed image saved at:", outputPath);

  return await pipeline.toBuffer();
};
