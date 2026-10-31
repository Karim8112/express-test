import express from "express";
import fs from "fs";
import path from "path";
import { config } from "../../../constants/core.js";
import { aboutUs } from "../../../models/Landing.js";

/**
 * PATCH /api/v1/about-us/:id
 * Updates titles, descriptions, and/or the image gallery for the About Us section.
 */
async function patchAboutUs(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    // 1. Verify document exists
    const existingDocument = await aboutUs.findById(id);
    if (!existingDocument) {
      return res.status(404).json({
        status: "failed",
        message: "AboutUs section not found",
      });
    }

    const updatedBody: Record<string, unknown> = { ...req.body };
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    let finalImages: string[] = [];

    // 2. Preserve existing image URLs sent in req.body
    const existingImages = Array.isArray(req.body.images)
      ? req.body.images
      : req.body.images
        ? [req.body.images]
        : [];

    if (existingImages.length > 0) {
      finalImages.push(...existingImages);
    }

    // 3. Process newly uploaded image files (if present)
    const newImageFiles = files?.images;

    if (newImageFiles && newImageFiles.length > 0) {
      newImageFiles.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || ".webp";
        const imageName = `aboutUs-${Date.now()}-${index}${imageType}`;
        const imagePath = `static/${imageName}`;

        // Save image buffer to local static directory
        fs.writeFileSync(imagePath, file.buffer);

        // Construct full public URL
        const imageUrl = `https://${config.host}/${imageName}`;
        finalImages.push(imageUrl);
      });
    }

    // 4. Retain original images if neither body images nor new files were supplied
    if (
      req.body.images === undefined &&
      (!newImageFiles || newImageFiles.length === 0)
    ) {
      finalImages = existingDocument.images || [];
    }

    updatedBody["images"] = finalImages;

    // 5. Update document in Database
    const updatedAboutUs = await aboutUs.findByIdAndUpdate(id, updatedBody, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      data: {
        aboutUs: updatedAboutUs,
      },
    });
  } catch (error) {
    console.error("PatchAboutUs Error:", error);
    return res.status(400).json({
      status: "failed",
      message: "Error updating AboutUs section",
    });
  }
}

export default patchAboutUs;
