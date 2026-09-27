import express from "express";
import { Project } from "../../models/Project.js";

async function GetAllProject(req: express.Request, res: express.Response) {
  try {
    const projects = await Project.find();
    res.status(200).json({
      status: "sucess",
      results: projects.length,
      data: { projects },
    });
  } catch {}
}

export default GetAllProject;
