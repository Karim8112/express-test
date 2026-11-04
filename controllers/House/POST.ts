import express, { type RequestHandler } from "express";
import { House } from "../../models/Estate.js";
import path from "path";
import fs from "fs";
import { config } from "../../constants/core.js";
import { HouseType } from "../../models/Estate.js";
const PostHouse: RequestHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const typeExists = await HouseType.exists({ _id: req.body.houseType });

    if (!typeExists) {
      res.status(404).json({
        status: "failed",
        message: "house Type not exist",
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
      const imageName = `houseMainImage${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;
      fs.writeFileSync(imagePath, mainImage.buffer);
      uploadedMainImageURL = `https://${config.host}/${imageName}`;
    }

    // ----------------------------------
    // adding images

    const Images = files?.images;
    const uploadedImagesURL: string[] = [];

    if (Images) {
      Images.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || "webp";
        const imageName = `house-${Date.now()}-${index}${imageType}`;

        let imagePath = `static/${imageName}`;

        // Write buffer to static folder
        fs.writeFileSync(imagePath, file.buffer);

        // Build fully-qualified accessible URL
        const imageUrl = `https://${config.host}/${imageName}`;
        uploadedImagesURL.push(imageUrl);
      });
    }

    // adding images After

    // pushing new URLs to updatedBody
    updatedBody["images"] = uploadedImagesURL;
    updatedBody["mainImage"] = uploadedMainImageURL;

    const success = await House.create(updatedBody);
    if (success) {
      res.status(201).json({
        status: "success",
        data: {
          house: req.body,
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

export default PostHouse;

// ------------------------------------------------------------------
