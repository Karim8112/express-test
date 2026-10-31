import express from "express";
import { list } from "../../../models/Landing.js";

async function GetAllList(req: express.Request, res: express.Response) {
  try {
    const filter: Record<string, unknown> = {};

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let totalList = 0;

    if (req.query.page) {
      totalList = await list.countDocuments(filter);
      if (totalList <= skip) {
        return res.status(404).json({
          status: "failed",
          message: "page not found",
        });
      }
    }

    const listData = await list.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      status: "success",
      results: listData.length,
      total: totalList || listData.length,
      data: listData,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to fetch List entries",
    });
  }
}

export default GetAllList;
