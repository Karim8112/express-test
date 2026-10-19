import { Team } from "../../models/Team.js";
import express from "express";
import fs from "fs";
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
  // const updatedBody = {
  //   ...req.body,
  // };
  // if (req.uploadImageLeft) {
  //   updatedBody.imageLeft = req.uploadImageLeft;
  // }
  // if (req.uploadImageRight) {
  //   updatedBody.imageRight = req.uploadImageRight;
  // }
  const { id } = req.params;
  let imageLeft, imageLeftName, imageLeftPath, imageLeftType;
  let imageRight, imageRightName, imageRightPath, imageRightType;
  //
  //
  const files = req.files as
    | { [fieldname: string]: Express.Multer.File[] }
    | undefined;

  //
  //
  // fetching the leftImage from the request
  if (files?.imageLeft && files.imageLeft.length > 0) {
    imageLeft = files.imageLeft[0];
    imageLeftType = imageLeft?.mimetype;
    imageLeftName = `imageLeft${Date.now()}.${imageLeftType as string}`;
    imageLeftPath = `/../../static/${imageLeftName}`;
  }
  // fetching the rightImage from the request
  if (files?.imageRight && files.imageRight.length > 0) {
    imageRight = files.imageRight[0];
    imageRightType = imageRight?.mimetype;
    imageRightName = `imageRight${Date.now()}.${imageRightType as string}`;
    imageRightPath = `/../../static/${imageRightName}`;
  }

  try {
    const updatedBody = {
      ...req.body,
    };

    if (imageLeft) {
      fs.writeFileSync(imageLeftPath as string, imageLeft.buffer);
      updatedBody["imageLeft"] = config.host
        .concat(baseURL)
        .concat(imageLeftName as string);
    }

    if (imageRight) {
      fs.writeFileSync(imageRightPath as string, imageRight.buffer);
      updatedBody["imageRight"] = config.host
        .concat(baseURL)
        .concat(imageRightName as string);
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
