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
    const updatedBody = req.body;

    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    const leftImageFile = files?.imageLeft?.[0];
    if (leftImageFile) {
      const imageLeftType = path
        .extname(leftImageFile.originalname)
        .toLowerCase();
      const imageLeftName = `imageLeft${Date.now()}${imageLeftType}`;
      const imageLeftPath = `static/${imageLeftName}`;
      fs.writeFileSync(imageLeftPath, leftImageFile.buffer);
      updatedBody["imageLeft"] = `https://${config.host}/${imageLeftName}`;
    }

    const rightImageFile = files?.imageRight?.[0];
    if (rightImageFile) {
      const imageRightType = path
        .extname(rightImageFile.originalname)
        .toLowerCase();
      const imageRightName = `imageRight${Date.now()}${imageRightType}`;
      const imageRightPath = `static/${imageRightName}`;
      fs.writeFileSync(imageRightPath, rightImageFile.buffer);
      updatedBody["imageRight"] = `https://${config.host}/${imageRightName}`;
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
