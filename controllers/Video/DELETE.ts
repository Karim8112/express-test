import { Video } from "../../models/Video.js";
import express from "express";

async function deleteVideo(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;
  try {
    const video = await Video.findByIdAndDelete(id);
    res.status(200).json({ status: "success", data: { video } });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default deleteVideo;
