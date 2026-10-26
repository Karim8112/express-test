import express, { type RequestHandler } from "express";
import { Project } from "../../models/Project.js";
import path from "path";
import fs from "fs";
import { config } from "../../constants/core.js";
import { ProjectType } from "../../models/ProjectType.js";
const PostProject: RequestHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const typeExists = ProjectType.exists({ _id: req.body.ProjectType });

    if (!typeExists) {
      res.status(404).json({
        status: "failed",
        message: "Project Type not exist",
      });
      return;
    }

    const updatedBody = req.body;
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    //adding main project image
    let uploadedMainImageURL: string = "";
    const mainImage = files?.mainImage?.[0];

    if (mainImage) {
      const imageType = path.extname(mainImage.originalname).toLowerCase();
      const imageName = `ProjectMainImage${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;
      fs.writeFileSync(imagePath, mainImage.buffer);
      uploadedMainImageURL = `https://${config.host}/${imageName}`;
    }

    // ----------------------------------
    // adding images Before

    const ImagesBefore = files?.imagesBefore;
    const uploadedImagesBeforeURL: string[] = [];

    if (ImagesBefore) {
      ImagesBefore.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || "webp";
        const imageName = `project-${Date.now()}-${index}${imageType}`;

        let imagePath = `static/${imageName}`;

        // Write buffer to static folder
        fs.writeFileSync(imagePath, file.buffer);

        // Build fully-qualified accessible URL
        const imageUrl = `https://${config.host}/${imageName}`;
        uploadedImagesBeforeURL.push(imageUrl);
      });
    }

    // adding images After
    const ImagesAfter = files?.imagesAfter;
    const uploadedImagesAfterURL: string[] = [];

    if (ImagesAfter) {
      ImagesAfter.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || "webp";
        const imageName = `project-${Date.now()}-${index}${imageType}`;

        let imagePath = `static/${imageName}`;

        // Write buffer to static folder
        fs.writeFileSync(imagePath, file.buffer);

        // Build fully-qualified accessible URL
        const imageUrl = `https://${config.host}/${imageName}`;
        uploadedImagesAfterURL.push(imageUrl);
      });
    }

    // pushing new URLs to updatedBody
    updatedBody["imagesBefore"] = uploadedImagesBeforeURL;
    updatedBody["imagesAfter"] = uploadedImagesAfterURL;
    updatedBody["mainImage"] = uploadedMainImageURL;

    const success = await Project.create(updatedBody);
    if (success) {
      res.status(201).json({
        status: "success",
        data: {
          project: req.body,
        },
      });
    } else {
      res.status(400).json({
        status: "failed",
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default PostProject;

// ------------------------------------------------------------------
