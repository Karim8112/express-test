import express, { type RequestHandler } from "express";
import fs from "fs";
import path from "path";
import { config } from "../../../constants/core.js";
import { whatWeDo } from "../../../models/Landing.js";

/**
 * POST /api/v1/what-we-do
 * Creates a new WhatWeDo entry with text and an image upload.
 */
export const postWhatWeDo: RequestHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const updatedBody: Record<string, unknown> = { ...req.body };

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    // 1. Process uploaded image if present
    const imageFile = files?.image?.[0];
    let uploadedImageUrl = "";

    if (imageFile) {
      const imageType =
        path.extname(imageFile.originalname).toLowerCase() || ".webp";
      const imageName = `WhatWeDoImage${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;

      fs.writeFileSync(imagePath, imageFile.buffer);
      uploadedImageUrl = `https://${config.host}/${imageName}`;
    }

    updatedBody["image"] = uploadedImageUrl;

    // 2. Create document in DB
    const newEntry = await whatWeDo.create(updatedBody);

    if (newEntry) {
      return res.status(201).json({
        status: "success",
        data: {
          whatWeDo: newEntry,
        },
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "Failed to create WhatWeDo entry",
      });
    }
  } catch (error) {
    console.error("PostWhatWeDo Error:", error);
    return res.status(400).json({
      status: "failed",
      message: error,
    });
  }
};

export default postWhatWeDo;
