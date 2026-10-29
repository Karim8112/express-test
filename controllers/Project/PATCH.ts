import path from "path";
import fs from "fs";
import { config } from "../../constants/core.js";
import { Project } from "../../models/Project.js";
import express from "express";
import { ProjectType } from "../../models/ProjectType.js";

async function patchProject(req: express.Request, res: express.Response) {
  const { id } = req.params;

  try {
    try {
      await ProjectType.exists({
        _id: req.body.projectType,
      });
    } catch {
      return res.status(404).json({
        status: "failed",
        message: "Project Type not exist",
      });
    }

    // getting the project by id
    const project = await Project.findById(id);
    if (!project) {
      return res
        .status(404)
        .json({ status: "failed", message: "Project not found" });
    }

    const updaetdBody = req.body;
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    // starting with images
    let mainImageUrl = project?.mainImage;
    let imagesBeforeUrl = project?.imagesBefore ?? [];
    let imagesAfterUrl = project?.imagesAfter ?? [];

    // uploading the main project image if exist
    const mainImage = files?.mainImage?.[0];

    if (mainImage) {
      const imageType = path.extname(mainImage.originalname).toLowerCase();
      const imageName = `ProjectMainImage${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;
      fs.writeFileSync(imagePath, mainImage.buffer);
      mainImageUrl = `https://${config.host}/${imageName}`;
    }

    // uploadnig imagesBefore if exist
    const imagesBefore = files?.imagesBefore;

    if (imagesBefore) {
      imagesBeforeUrl.length = 0;
      imagesBefore.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || "webp";
        const imageName = `project-${Date.now()}-${index}${imageType}`;

        let imagePath = `static/${imageName}`;

        // Write buffer to static folder
        fs.writeFileSync(imagePath, file.buffer);

        // Build fully-qualified accessible URL
        const imageUrl = `https://${config.host}/${imageName}`;
        imagesBeforeUrl.push(imageUrl);
      });
    }

    // uploading imagesAfter if exist
    // uploadnig imagesBefore if exist
    const imagesAfter = files?.imagesAfter;

    if (imagesAfter) {
      imagesAfterUrl.length = 0;
      imagesAfter.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || "webp";
        const imageName = `project-${Date.now()}-${index}${imageType}`;

        let imagePath = `static/${imageName}`;

        // Write buffer to static folder
        fs.writeFileSync(imagePath, file.buffer);

        // Build fully-qualified accessible URL
        const imageUrl = `https://${config.host}/${imageName}`;
        imagesAfterUrl.push(imageUrl);
      });
    }

    // pushimg images url to the updatedBody
    // ====================================================
    updaetdBody["mainImage"] = mainImageUrl;
    updaetdBody["imagesBefore"] = imagesBeforeUrl;
    updaetdBody["imagesAfter"] = imagesAfterUrl;

    //
    const projectData = await Project.findByIdAndUpdate(id, updaetdBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { projectData } });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "error",
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default patchProject;
