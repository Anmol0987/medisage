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
exports.preprocessImage = void 0;
const sharp_1 = __importDefault(require("sharp"));
const preprocessImage = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const outputPath = filePath.replace(/\.(jpg|jpeg|png)$/i, "_preprocessed.png");
    const image = (0, sharp_1.default)(filePath);
    const metadata = yield image.metadata();
    console.log("metadata", metadata);
    const zoomFactor = 1.2;
    const cropWidth = Math.floor(metadata.width / zoomFactor);
    const cropHeight = Math.floor(metadata.height / zoomFactor);
    const left = Math.floor((metadata.width - cropWidth) / 2);
    const top = Math.floor((metadata.height - cropHeight) / 2);
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
    yield pipeline.clone().toFile(outputPath);
    console.log("Processed image saved at:", outputPath);
    return yield pipeline.toBuffer();
});
exports.preprocessImage = preprocessImage;
