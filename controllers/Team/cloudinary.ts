import { v2 as cloudinary } from "cloudinary";
import express from "express";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME ?? "",
  api_key: process.env.CLOUDINARY_APIKEY ?? "",
  api_secret: process.env.CLOUDINARY_APISECRET ?? "",
});

export const uploadForamts = ["png", "jpg", "jpeg", "webp"];
module.exports = cloudinary;
// ================================

async function UploadImageLeft(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const { imageLeft } = req.body;
  const teamId = req.params.id;

  // Path points outside the Node app to Hostinger's public document root
  const uploadPath = "images/team_images/".concat(teamId as string);

  try {
    const uploadedImage = await cloudinary.uploader.upload(imageLeft, {
      upload_preset: "unsigned_upload", // Created in Cloudinary settings
      allowed_formats: uploadForamts,
      folder: uploadPath,
    });

    console.log("Cloudinary Upload Success:", uploadedImage);
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
  next();
}

export default UploadImageLeft;
