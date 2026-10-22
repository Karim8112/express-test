import express, { type RequestHandler } from "express";
import { Project } from "../../models/Project.js";
import path from "path";
import fs from "fs";
import { config } from "../../constants/core.js";
const PostProject: RequestHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const updatedProject = req.body;
    const files = req.files as Express.Multer.File[] | undefined;
    const newUploadedUrls: string[] = [];
    const Images = files?.length
      ? files.filter((file: Express.Multer.File) => file.fieldname == "images")
      : [];
    // console.log("those are the images:", Images);
    // Save each compressed buffer to disk and construct public URLs
    if (Images?.length > 0) {
      Images.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || "webp";
        const imageName = `project-${Date.now()}-${index}${imageType}`;

        let imagePath = `static/${imageName}`;

        // Write buffer to static folder
        fs.writeFileSync(imagePath, file.buffer);

        // Build fully-qualified accessible URL
        const imageUrl = `https://${config.host}/${imageName}`;
        newUploadedUrls.push(imageUrl);
      });
    }

    updatedProject["images"] = newUploadedUrls;
    const success = await Project.create(req.body);
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
