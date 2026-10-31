import express from "express";
import fs from "fs";
import path from "path";
import { config } from "../../../constants/core.js";
import { additionalSection } from "../../../models/Landing.js";

async function patchAdditionalSection(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    const section = await additionalSection.findById(id);
    if (!section) {
      return res.status(404).json({
        status: "failed",
        message: "Additional section not found",
      });
    }

    const updatedBody: Record<string, unknown> = { ...req.body };
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    let imageUrl = section.image;
    const imageFile = files?.image?.[0];

    if (imageFile) {
      const imageType =
        path.extname(imageFile.originalname).toLowerCase() || ".webp";
      const imageName = `additionalSection-${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;

      fs.writeFileSync(imagePath, imageFile.buffer);
      imageUrl = `https://${config.host}/${imageName}`;
    }

    updatedBody["image"] = imageUrl;

    const updatedSection = await additionalSection.findByIdAndUpdate(
      id,
      updatedBody,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      status: "success",
      data: {
        additionalSection: updatedSection,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}

export default patchAdditionalSection;
