import { Team } from "../../models/Team.js";
import express from "express";

async function GetTeamById(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    const team_member: typeof Team | null = await Team.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        ...team_member,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default GetTeamById;
