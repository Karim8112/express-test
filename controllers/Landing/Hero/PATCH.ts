import express from "express";
import fs from "fs";
import path from "path";
import { config } from "../../../constants/core.js";
import { Hero } from "../../../models/Landing.js";

async function patchHero(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    // 1. Verify document exists in database
    const hero = await Hero.findById(id);
    if (!hero) {
      return res.status(404).json({
        status: "failed",
        message: "Hero document not found",
      });
    }

    const updatedBody = { ...req.body };

    // 2. Extract files parsed by Multer middleware
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    // Default to retaining existing image URL
    let heroImageUrl = hero.heroImage;

    const mainImageFile = files?.heroImage?.[0];

    // 3. If a new heroImage file was uploaded, save it to disk
    if (mainImageFile) {
      const imageType =
        path.extname(mainImageFile.originalname).toLowerCase() || ".webp";
      const imageName = `HeroImage${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;

      // Write file buffer to local static directory
      fs.writeFileSync(imagePath, mainImageFile.buffer);

      // Construct accessible public URL
      heroImageUrl = `https://${config.host}/${imageName}`;
    }

    // Assign the updated or existing image URL to updatedBody
    updatedBody["heroImage"] = heroImageUrl;

    // 4. Perform database update
    const updatedHero = await Hero.findByIdAndUpdate(id, updatedBody, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: "success",
      data: {
        hero: updatedHero,
      },
    });
  } catch (error) {
    console.error("PatchHero Error:", error);
    return res.status(400).json({
      status: "failed",
      message: "Failed to update Hero section",
    });
  }
}

export default patchHero;
