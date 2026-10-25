import express from "express";
import { ProjectType } from "../../models/ProjectType.js";

async function GetAllTeam(req: express.Request, res: express.Response) {
  try {
    const projectTypes = await ProjectType.find();
    res.status(200).json({
      status: "success",
      results: projectTypes.length,
      data: projectTypes,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      message: "Failed to fetch projectTypes",
    });
  }
}

export default GetAllTeam;
