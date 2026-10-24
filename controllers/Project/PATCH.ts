import path from "path";
import fs from "fs";
import { config } from "../../constants/core.js";
import { Project } from "../../models/Project.js";
import express from "express";

async function patchProject(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    const project = await Project.findById(id);
    if (!project) {
      res.status(404).json({ status: "failed", message: "Project not found" });
      return;
    }

    let mainImageUrl = project?.mainImage;
    let imagesUrl = project?.images ?? [];

    const updaetdBody = req.body;
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    // getting the main project image
    const mainImage = files?.mainImage?.[0];

    if (mainImage) {
      const imageType = path.extname(mainImage.originalname).toLowerCase();
      const imageName = `ProjectMainImage${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;
      fs.writeFileSync(imagePath, mainImage.buffer);
      mainImageUrl = `https://${config.host}/${imageName}`;
    }

    // getting images
    const images = files?.images;

    if (images) {
      imagesUrl.length = 0;
      images.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || "webp";
        const imageName = `project-${Date.now()}-${index}${imageType}`;

        let imagePath = `static/${imageName}`;

        // Write buffer to static folder
        fs.writeFileSync(imagePath, file.buffer);

        // Build fully-qualified accessible URL
        const imageUrl = `https://${config.host}/${imageName}`;
        imagesUrl.push(imageUrl);
      });
    }

    // after extracting the images
    // ====================================================
    updaetdBody["mainImage"] = mainImageUrl;
    updaetdBody["images"] = imagesUrl;
    //
    const projectData = await Project.findByIdAndUpdate(id, updaetdBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { projectData } });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default patchProject;
