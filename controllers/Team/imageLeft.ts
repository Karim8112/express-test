import express from "express";

import { uploadForamts, cloudinary } from "../../cloudinary.js";

// 1\. Configure Multer to store the file in memory buffer

async function UploadImageLeft(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    if (!files || !files.imageLeft || files.imageLeft.length === 0) {
      return next();
    }

    const file = files.imageLeft[0];
    if (!file) {
      return next();
    }
    const teamId = req.params.id;
    const uploadPath = "images/team_images/".concat(teamId as string);
    const b64 = Buffer.from(file.buffer).toString("base64");
    const dataURL = `data:${file.mimetype};base64,${b64}`;

    const uploadedImage = await cloudinary.uploader.upload(dataURL, {
      // upload_preset: "unsigned_upload", // Created in Cloudinary settings
      allowed_formats: uploadForamts,
      folder: uploadPath,
      public_id: "imageLeft",
      overwrite: true,
      invalidate: true,
    });

    (req as any).uploadImageLeft = (
      process.env.IMAGED_SAVED_LINK ?? ("" as string)
    ).concat(uploadedImage.public_id);
    next();

    //
  } catch (err) {
    console.error("Cloudinary Upload Error:", err);
    res.status(500).json({
      status: "fail",
      error: err,
    });
    return;
  }
}

export default UploadImageLeft;
