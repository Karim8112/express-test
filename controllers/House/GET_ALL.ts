import express from "express";
import { House } from "../../models/Estate.js";

async function GetAllHouses(req: express.Request, res: express.Response) {
  try {
    const filter: Record<string, unknown> = {};

    // Filtering based on Houses type
    if (req.query.houseType) {
      filter.houseType = req.query.houseType;
      console.log("this is house type", req.query.houseType);
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    let totalHouses = 0;
    // check page
    if (req.query.page) {
      totalHouses = await House.countDocuments(filter);

      if (totalHouses <= skip) {
        console.log("this is the total houses found", totalHouses);
        res.status(200).json({
          status: "failed",
          total: 0,
          data: [],
          message: "page not found",
        });
      }
    }

    const houses = await House.find(filter)
      .select("-images")
      .populate({
        path: "houseType",
        select: "name",
      })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "sucess",
      results: houses.length,
      total: totalHouses,
      data: houses,
    });
  } catch {
    res.status(400).json({
      status: "failed",
      message: "there is wrong",
    });
  }
}

export default GetAllHouses;
