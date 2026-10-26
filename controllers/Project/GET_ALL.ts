import express from "express";
import { Project } from "../../models/Project.js";

async function GetAllProject(req: express.Request, res: express.Response) {
  try {
    // console.log("this is the request query: ", req.query);
    const projects = await Project.find()
      .populate({
        path: "projectType",
        select: "name",
      })
      .select("-imagesBefore -imagesAfter");

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
