import { Team } from "../../models/Team.js";
import express from "express";

declare global {
  namespace Express {
    interface Request {
      uploadImageURL?: string;
    }
  }
}

async function patchTeam(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;
  const updatedBody = {
    ...req.body,
    imageLeft: req.uploadImageURL ? req.uploadImageURL : req.body.imageLeft,
  };

  try {
    const team_memeber = await Team.findByIdAndUpdate(id, updatedBody, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({ status: "success", data: { team_memeber } });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default patchTeam;
