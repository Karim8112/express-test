import { Team } from "../../models/Team.js";
import express from "express";
import fs from "fs";
import path from "path";
import { baseURL, config } from "../../constants/core.js";
// declare global {
//   namespace Express {
//     interface Request {
//       uploadImageLeft?: string;
//       uploadImageRight?: string;
//     }
//   }
// }

async function patchTeam(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  try {
    const { id } = req.params;
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
      updatedBody["imageLeft"] = `${config.host}/${imageLeftName as string}`;
    }

    const rightImageFile = files?.imageRight?.[0];
    if (rightImageFile) {
      imageRightType = path.extname(rightImageFile.originalname).toLowerCase();
      imageRightName = `imageRight${Date.now()}${imageRightType as string}`;
      imageRightPath = `static/${imageRightName}`;
      fs.writeFileSync(imageRightPath as string, rightImageFile.buffer);
      updatedBody["imageRight"] = `${config.host}/${imageRightName as string}`;
    }

    try {
      const team_memeber = await Team.findByIdAndUpdate(id, updatedBody, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({ status: "success", data: { team_memeber } });
    } catch {
      res.status(400).json({
        status: "failed",
        message: "failed to update the team member",
      });
    }
  } catch {
    res.status(400).json({
      status: "failed",
      message: "failed to upload images",
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default patchTeam;
