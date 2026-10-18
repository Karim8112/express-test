import express, { type RequestHandler } from "express";
import { Video } from "../../models/Video.js";
const PostVideo: RequestHandler = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const success = await Video.create(req.body);
    if (success) {
      res.status(201).json({
        status: "success",
        data: {
          video: req.body,
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

export default PostVideo;

// ------------------------------------------------------------------
