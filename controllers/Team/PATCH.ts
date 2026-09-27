import { Team } from "../../models/Team.js";
import express from "express";

async function patchTeam(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;
  try {
    const team_memeber = await Team.findByIdAndUpdate(id, req.body, {
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
