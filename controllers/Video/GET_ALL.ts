import express from "express";
import { Video } from "../../models/Video.js";

async function GetAllVideo(req: express.Request, res: express.Response) {
  try {
    const vidoes = await Video.find();
    res.status(200).json({
      status: "sucess",
      results: vidoes.length,
      data: vidoes,
    });
  } catch {
    res.status(400).json({});
  }
}

export default GetAllVideo;
