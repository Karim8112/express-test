import express from "express";

import { uploadForamts, cloudinary } from "../../cloudinary.js";

// 1\. Configure Multer to store the file in memory buffer

async function UploadImageRight(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (!req.file) {
      res.status(400).json({
        status: "fail",
        message: 'No image file provided in field "imageRight"',
      });
      return;
    }

    const teamId = req.params.id;
    const uploadPath = "images/team_images/".concat(teamId as string);
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURL = `data:${req.file.mimetype};base64,${b64}`;

    const uploadedImageRight = await cloudinary.uploader.upload(dataURL, {
      // upload_preset: "unsigned_upload", // Created in Cloudinary settings
      allowed_formats: uploadForamts,
      folder: uploadPath,
      public_id: "imageRight",
      overwrite: true,
      invalidate: true,
    });

    console.log("Cloudinary Upload Success:", uploadedImageRight);
    (req as any).uploadedImageRight = (
      process.env.IMAGED_SAVED_LINK ?? ("" as string)
    ).concat(uploadedImageRight.public_id);
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
  //   cb(null, `imageRight.${ext}`);
}

export default UploadImageRight;
