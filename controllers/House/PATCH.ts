import path from "path";
import fs from "fs";
import { config } from "../../constants/core.js";
import { House } from "../../models/Estate.js";
import express from "express";
import { HouseType } from "../../models/Estate.js";

async function patchHouse(req: express.Request, res: express.Response) {
  const { id } = req.params;

  try {
    try {
      await HouseType.exists({
        _id: req.body.houseType,
      });
    } catch {
      return res.status(404).json({
        status: "failed",
        message: "House Type not exist",
      });
    }

    // getting the project by id
    const house = await House.findById(id);
    if (!house) {
      return res
        .status(404)
        .json({ status: "failed", message: "house not found" });
    }

    const updaetdBody = req.body;
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    // starting with images
    let mainImageUrl = house?.mainImage;
    let imagesURL: string[] = [];

    // -----------------------------------------------------------------------------------
    // uploading the main project image if exist
    const mainImage = files?.mainImage?.[0];

    if (mainImage) {
      const imageType = path.extname(mainImage.originalname).toLowerCase();
      const imageName = `HouseMainImage${Date.now()}${imageType}`;
      const imagePath = `static/${imageName}`;
      fs.writeFileSync(imagePath, mainImage.buffer);
      mainImageUrl = `https://${config.host}/${imageName}`;
    }

    // -----------------------------------------------------------------------------------
    // in case old images  sent again as URLs
    const imagesArray = Array.isArray(req.body.images)
      ? req.body.images
      : req.body.images
        ? [req.body.images]
        : [];

    if (imagesArray) {
      imagesArray.map((url: string) => imagesURL.push(url));
    }

    // uploadnig imagesBefore if exist
    const images = files?.images;

    if (images) {
      // imagesUrl.length = 0;
      images.forEach((file, index) => {
        const imageType =
          path.extname(file.originalname).toLowerCase() || "webp";
        const imageName = `house-${Date.now()}-${index}${imageType}`;

        let imagePath = `static/${imageName}`;

        // Write buffer to static folder
        fs.writeFileSync(imagePath, file.buffer);

        // Build fully-qualified accessible URL
        const imageUrl = `https://${config.host}/${imageName}`;
        imagesURL.push(imageUrl);
      });
    }

    // -----------------------------------------------------------------------------------

    // pushimg images url to the updatedBody
    // ====================================================
    updaetdBody["mainImage"] = mainImageUrl;
    updaetdBody["images"] = imagesURL;

    //
    const houseData = await House.findByIdAndUpdate(id, updaetdBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { houseData } });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "error",
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default patchHouse;
