import express from "express";
import { Team } from "../../models/Team.js";
import type { RequestHandler } from "express-serve-static-core";
const PostTeam: RequestHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const success = await Team.create(req.body);
    if (success) {
      res.status(201).json({
        status: "success",
        data: {
          team_member: req.body,
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
