import express from "express";
import { Hero } from "../../../models/Landing.js";

async function GetAllHero(req: express.Request, res: express.Response) {
  try {
    const filter: Record<string, unknown> = {};

    // Pagination configuration
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let totalHero = 0;

    if (req.query.page) {
      totalHero = await Hero.countDocuments(filter);
      if (totalHero <= skip) {
        return res.status(404).json({
          status: "failed",
          message: "page not found",
        });
      }
    }

    const heroData = await Hero.find(filter).skip(skip).limit(limit);

    res.status(200).json({
      status: "success",
      results: heroData.length,
      total: totalHero || heroData.length,
      data: heroData,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to fetch Hero entries",
    });
  }
}

export default GetAllHero;
