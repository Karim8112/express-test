import { Team } from "../../models/Team.js";
import express from "express";
import fs from "fs";
import path from "path";
import { baseURL, config } from "../../constants/core.js";

async function patchTeam(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  try {
    const { id } = req.params;
    const team_member = await Team.findById(id);
    if (!team_member) {
      res
        .status(404)
        .json({ status: "failed", message: "team member not found" });
      return;
    }

    let leftImageUrl = team_member.imageLeft;
    let rightImageUrl = team_member.imageRight;

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
      leftImageUrl = `https://${config.host}/${imageLeftName}`;
    }

    const rightImageFile = files?.imageRight?.[0];
    if (rightImageFile) {
      const imageRightType = path
        .extname(rightImageFile.originalname)
        .toLowerCase();
      const imageRightName = `imageRight${Date.now()}${imageRightType}`;
      const imageRightPath = `static/${imageRightName}`;
      fs.writeFileSync(imageRightPath, rightImageFile.buffer);
      rightImageUrl = `https://${config.host}/${imageRightName}`;
    }

    updatedBody["iamgeLeft"] = leftImageUrl;
    updatedBody["imageRight"] = rightImageUrl;

    const teamMemberData = await Team.findByIdAndUpdate(id, updatedBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { teamMemberData } });
  } catch {
    res.status(400).json({
      status: "failed",
      message: "failed to update team member",
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default patchTeam;
