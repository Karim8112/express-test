import { Project } from "../../models/Project.js";
import express from "express";

async function GetProjectById(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    const project: typeof Project | null = await Project.findById(id);
    res.status(200).json({
      status: "success",
      data: {
        ...project,
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

export default GetProjectById;
