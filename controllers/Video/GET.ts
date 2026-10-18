import { Video } from "../../models/Video.js";
import express from "express";

async function GetVideoById(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    const video: typeof Video | null = await Video.findById(id);
    res.status(200).json(video);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default GetVideoById;
