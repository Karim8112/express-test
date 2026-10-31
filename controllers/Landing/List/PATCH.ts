import express from "express";
import fs from "fs";
import path from "path";
import { config } from "../../../constants/core.js";
import { list } from "../../../models/Landing.js";

/**
 * PATCH /api/v1/list/:id
 * Updates title, desc, and/or image for an existing List item.
 */
async function patchList(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    // 1. Verify item exists
    const existingList = await list.findById(id);
    if (!existingList) {
      return res.status(404).json({
        status: "failed",
        message: "List item not found",
      });
    }

    const updatedBody: Record<string, unknown> = { ...req.body };
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    let imageUrl = existingList.image; // Retain current image URL by default
    const imageFile = files?.image?.[0];

    // 2. Process new image if provided
    if (imageFile) {
      const imageType =
        path.extname(imageFile.originalname).toLowerCase() || ".webp";
      const imageName = `ListImage${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;

      fs.writeFileSync(imagePath, imageFile.buffer);
      imageUrl = `https://${config.host}/${imageName}`;
    }

    updatedBody["image"] = imageUrl;

    // 3. Format desc array if provided in request
    if (req.body.desc) {
      updatedBody["desc"] = Array.isArray(req.body.desc)
        ? req.body.desc
        : [req.body.desc];
    }

    // 4. Update document in Database
    const updatedList = await list.findByIdAndUpdate(id, updatedBody, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      data: {
        list: updatedList,
      },
    });
  } catch (error) {
    console.error("PatchList Error:", error);
    return res.status(400).json({
      status: "failed",
      message: "Error updating List item",
    });
  }
}

export default patchList;
