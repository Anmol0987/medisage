import { Request } from "express";
import multer, { diskStorage } from "multer";
import path from "path";

const storage = diskStorage({
  destination: function (_req, _file, cb) {
    cb(null, "uploads/");
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "_" + Math.round(Math.random() * 1e9);
    console.log("unique suffix+++++", uniqueSuffix);
    const fileExtension = path.extname(file.originalname);
    const uniqueFileName = file.fieldname + "_" + uniqueSuffix + fileExtension;
    cb(null, uniqueFileName);
  },
});
function fileFilter(
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  const allowedFileType = ["application/pdf", "image/jpg", "image/png","image/jpeg"];
  if (!allowedFileType.includes(file.mimetype)) {
    cb(new Error("Only PDF, JPEG and PNG files are allowed."));
  } else {
    cb(null,true)
  }
}

export const upload=multer({
    storage,
    limits:{fileSize:10*1024*1024},
    fileFilter:fileFilter
})
