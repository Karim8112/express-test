import { Project } from "../../models/Project.js";
import express from "express";
import { ProjectType } from "../../models/ProjectType.js";

async function GetProjectById(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;
  let projectType;
  let updatedProjectBody;
  try {
    const project = await Project.findById(id);
    if (project) {
      try {
        projectType = await ProjectType.findById(project.projectType._id);

        updatedProjectBody = { ...project.toObject(), projectType };
      } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err,
        });
        return;
      }
    }

    res.status(200).json(updatedProjectBody ?? project);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
    return;
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default GetProjectById;
