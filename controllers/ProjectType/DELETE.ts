import { ProjectType } from "../../models/ProjectType.js";
import { Project } from "../../models/Project.js";
import express from "express";

const DeleteProjectType = async function (
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

    const projectsFound = await Project.find({ projectType: id });

    if (projectsFound.length > 0) {
      res.status(400).json({
        status: "failed",
        message: "Project type has projects and can't be deleted",
      });
      return;
    }

    const projectTypeDeleted = await ProjectType.findByIdAndDelete(id);

    if (projectTypeDeleted) {
      res.status(200).json({
        status: "success",
        data: { ProjectType: projectTypeDeleted },
      });
    }
  } catch {
    res.status(400).json({
      status: "fail",
      message: "failed to delete project type",
    });
  }
};

export default DeleteProjectType;
