import { ProjectType } from "../../models/ProjectType.js";
import express from "express";

const PostProjectType = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: "fail",
        message: "project type not found",
      });
      return;
    }

    const projectType = await ProjectType.findByIdAndDelete(id, req.body);
    if (projectType) {
      res.status(200).json({
        status: "success",
        data: { ProjectType: projectType },
      });
    }
  } catch {
    res.status(400).json({
      status: "fail",
      message: "failed to delete project type",
    });
  }
};

export default PostProjectType;
