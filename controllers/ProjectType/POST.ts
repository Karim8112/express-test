import { ProjectType } from "../../models/ProjectType.js";
import express from "express";

const PostProjectType = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const projectType = await ProjectType.create(req.body);
    if (projectType) {
      res.status(200).json({
        status: "success",
        data: {
          projectType: projectType,
        },
      });
    }
  } catch {
    res.status(400).json({
      status: "fail",
      message: "failed to add project type",
    });
  }
};

export default PostProjectType;
