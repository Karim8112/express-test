import express from "express";
import { whatWeDo } from "../../../models/Landing.js";

async function GetAllWhatWeDo(req: express.Request, res: express.Response) {
  try {
    const filter: Record<string, unknown> = {};

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let totalWhatWeDo = 0;

    if (req.query.page) {
      totalWhatWeDo = await whatWeDo.countDocuments(filter);
      if (totalWhatWeDo <= skip) {
        return res.status(404).json({
          status: "failed",
          message: "page not found",
        });
      }
    }

    const whatWeDoData = await whatWeDo.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      status: "success",
      results: whatWeDoData.length,
      total: totalWhatWeDo || whatWeDoData.length,
      data: whatWeDoData,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to fetch WhatWeDo entries",
    });
  }
}

export default GetAllWhatWeDo;
