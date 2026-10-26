import express from "express";
import { Project } from "../../models/Project.js";

async function GetAllProject(req: express.Request, res: express.Response) {
  try {
    const filter: Record<string, unknown> = {};

    // Filtering based on project type
    if (req.query.projectType) {
      filter.projectType = req.query.projectType;
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // check page
    if (req.query.page) {
      const totalProjects = await Project.countDocuments(filter);

      if (totalProjects <= skip) {
        res.status(404).json({
          status: "failed",
          message: "page not found",
        });
      }
    }

    const projects = await Project.find(filter)
      .select("-imagesBefore -imagesAfter")
      .populate({
        path: "projectType",
        select: "name",
      })
      .skip(skip)
      .limit(limit);

    console.log("this is the projects", projects);
    res.status(200).json({
      status: "sucess",
      results: projects.length,
      data: projects,
    });
  } catch {
    res.status(400).json({
      status: "failed",
      message: "there is wrong",
    });
  }
}

export default GetAllProject;
