import express from "express";
import { Team } from "../../models/Team.js";
import type { RequestHandler } from "express-serve-static-core";
import path from "path";
import fs from "fs";
import { config } from "../../constants/core.js";
const PostTeam: RequestHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    let imageLeftName, imageLeftPath, imageLeftType;
    let imageRightName, imageRightPath, imageRightType;

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const updatedBody = {
      ...req.body,
    };

    const leftImageFile = files?.imageLeft?.[0];
    if (leftImageFile) {
      imageLeftType = path.extname(leftImageFile.originalname).toLowerCase();
      imageLeftName = `imageLeft${Date.now()}${imageLeftType as string}`;
      imageLeftPath = `static/${imageLeftName}`;
      fs.writeFileSync(imageLeftPath as string, leftImageFile.buffer);
      updatedBody["imageLeft"] =
        `https://${config.host}/${imageLeftName as string}`;
    }

    const rightImageFile = files?.imageRight?.[0];
    if (rightImageFile) {
      imageRightType = path.extname(rightImageFile.originalname).toLowerCase();
      imageRightName = `imageRight${Date.now()}${imageRightType as string}`;
      imageRightPath = `static/${imageRightName}`;
      fs.writeFileSync(imageRightPath as string, rightImageFile.buffer);
      updatedBody["imageRight"] =
        `https://${config.host}/${imageRightName as string}`;
    }

    const success = await Team.create(updatedBody);
    if (success) {
      res.status(201).json({
        status: "success",
        data: {
          team_member: updatedBody,
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

export default PostTeam;

// ------------------------------------------------------------------
