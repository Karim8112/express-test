import { House } from "../../models/Estate.js";
import express from "express";

async function deleteHouse(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;
  try {
    const house = await House.findByIdAndDelete(id);
    res.status(200).json({ status: "success", data: { house } });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default deleteHouse;
