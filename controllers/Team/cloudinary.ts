import { v2 as cloudinary } from "cloudinary";
import express from "express";
import multer from "multer";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME ?? "",
  api_key: process.env.CLOUDINARY_APIKEY ?? "",
  api_secret: process.env.CLOUDINARY_APISECRET ?? "",
});

export const uploadForamts = ["png", "jpg", "jpeg", "webp"];
export { cloudinary };

// 1\. Configure Multer to store the file in memory buffer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Multer middleware to extract the field named "imageLeft"
// ================================
export const uploadImageMiddleware = upload.single("imageLeft");

async function UploadImageLeft(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (!req.file) {
      res.status(400).json({
        status: "fail",
        message: 'No image file provided in field "imageLeft"',
      });
      return;
    }

    const teamId = req.params.id;
    const uploadPath = "images/team_images/".concat(teamId as string);
    const b46 = Buffer.from(req.file.buffer).toString("base64");
    const dataURL = `data:${req.file.mimetype};base46,${b46}`;

    const uploadedImage = await cloudinary.uploader.upload(dataURL, {
      upload_preset: "unsigned_upload", // Created in Cloudinary settings
      allowed_formats: uploadForamts,
      folder: uploadPath,
      public_id: "imageLeft",
      overwrite: true,
      invalidate: true,
    });

    console.log("Cloudinary Upload Success:", uploadedImage);
    // (req as any).uploadImageURL = dataURL;
    next();
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    res.status(500).json({
      status: "fail",
      error: err,
    });
    return;
  }

  //   const ext = file.mimetype.split("/")[1];
  //   cb(null, `imageLeft.${ext}`);
}

export default UploadImageLeft;
