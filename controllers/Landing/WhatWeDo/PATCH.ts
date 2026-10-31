import express from "express";
import fs from "fs";
import path from "path";
import { config } from "../../../constants/core.js";
import { whatWeDo } from "../../../models/Landing.js";

/**
 * PATCH /api/v1/what-we-do/:id
 * Updates an existing WhatWeDo entry's text and/or image.
 */
export async function patchWhatWeDo(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    // 1. Verify item exists
    const item = await whatWeDo.findById(id);
    if (!item) {
      return res.status(404).json({
        status: "failed",
        message: "WhatWeDo item not found",
      });
    }

    const updatedBody: Record<string, unknown> = { ...req.body };
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    // 2. Retain existing image URL by default
    let imageUrl = item.image;

    const imageFile = files?.image?.[0];

    // 3. Process new image upload if provided
    if (imageFile) {
      const imageType =
        path.extname(imageFile.originalname).toLowerCase() || ".webp";
      const imageName = `WhatWeDoImage${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;

      fs.writeFileSync(imagePath, imageFile.buffer);
      imageUrl = `https://${config.host}/${imageName}`;
    }

    updatedBody["image"] = imageUrl;

    // 4. Update document
    const updatedItem = await whatWeDo.findByIdAndUpdate(id, updatedBody, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      data: {
        whatWeDo: updatedItem,
      },
    });
  } catch (error) {
    console.error("PatchWhatWeDo Error:", error);
    return res.status(400).json({
      status: "failed",
      message: "Error updating WhatWeDo item",
    });
  }
}

export default patchWhatWeDo;
