import express from "express";
import fs from "fs";
import path from "path";
import { Test } from "../../models/test.js";
import { config } from "../../constants/core.js";

export async function AddImages(req: express.Request, res: express.Response) {
  try {
    const files = req.files as Express.Multer.File[] | undefined;

    // Resolve static directory path

    const newUploadedUrls: string[] = [];
    const Images = files?.length
      ? files.filter((file: Express.Multer.File) => file.fieldname == "images")
      : [];
    // console.log("those are the images:", Images);
    // Save each compressed buffer to disk and construct public URLs
    if (Images?.length > 0) {
      Images.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || "webp";
        const imageName = `project-${Date.now()}-${index}${imageType}`;

        let imagePath = `static/${imageName}`;

        // Write buffer to static folder
        fs.writeFileSync(imagePath, file.buffer);

        // Build fully-qualified accessible URL
        const imageUrl = `https://${config.host}/${imageName}`;
        newUploadedUrls.push(imageUrl);
      });
    }

    // Retrieve existing image URLs passed from frontend (for keeping existing photos)

    // Combine existing preserved image URLs with newly uploaded image URLs

    // Update MongoDB document
    const sucess = await Test.create({ images: newUploadedUrls });

    if (!sucess) {
      return res.status(404).json({
        status: "failed",
        message: "Project not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: { tests: { images: newUploadedUrls } },
    });
  } catch (error) {
    console.error(" Image Array Controller Error:", error);
    return res.status(500).json({
      status: "failed",
      message: "Failed to process image array update",
    });
  }
}
