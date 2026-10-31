import express, { type RequestHandler } from "express";
import fs from "fs";
import path from "path";
import { config } from "../../../constants/core.js";
import { additionalSection } from "../../../models/Landing.js";

const postAdditionalSection: RequestHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const updatedBody: Record<string, unknown> = { ...req.body };
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    let uploadedImageURL: string = "";
    const imageFile = files?.image?.[0];

    if (imageFile) {
      const imageType =
        path.extname(imageFile.originalname).toLowerCase() || ".webp";
      const imageName = `additionalSection-${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;

      fs.writeFileSync(imagePath, imageFile.buffer);
      uploadedImageURL = `https://${config.host}/${imageName}`;
    }

    updatedBody["image"] = uploadedImageURL;

    const newSection = await additionalSection.create(updatedBody);

    res.status(201).json({
      status: "success",
      data: {
        additionalSection: newSection,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

export default postAdditionalSection;
