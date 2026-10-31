import express, { type RequestHandler } from "express";
import fs from "fs";
import path from "path";
import { config } from "../../../constants/core.js";
import { list } from "../../../models/Landing.js";

/**
 * POST /api/v1/list
 * Creates a new List item with title, description array, and uploaded image.
 */
const postList: RequestHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const updatedBody: Record<string, unknown> = { ...req.body };
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    // 1. Check for uploaded image file
    const imageFile = files?.image?.[0];
    if (!imageFile) {
      return res.status(400).json({
        status: "failed",
        message: "please add the image",
      });
    }

    // 2. Save image buffer to local static directory
    const imageType =
      path.extname(imageFile.originalname).toLowerCase() || ".webp";
    const imageName = `ListImage${Date.now()}${imageType}`;
    const imagePath = `static/${imageName}`;

    fs.writeFileSync(imagePath, imageFile.buffer);

    // 3. Build public image URL
    const imageUrl = `https://${config.host}/${imageName}`;
    updatedBody["image"] = imageUrl;

    // 4. Ensure desc is properly formatted as string array
    if (req.body.desc) {
      updatedBody["desc"] = Array.isArray(req.body.desc)
        ? req.body.desc
        : [req.body.desc];
    }

    // 5. Create new List document
    const newList = await list.create(updatedBody);

    return res.status(201).json({
      status: "success",
      data: {
        list: newList,
      },
    });
  } catch (error) {
    console.error("PostList Error:", error);
    return res.status(400).json({
      status: "failed",
      message: "Error creating List item",
    });
  }
};

export default postList;
