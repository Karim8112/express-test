import express from "express";
import { HouseType } from "../../models/Estate.js";

async function GetAllHousesType(req: express.Request, res: express.Response) {
  try {
    const houseTypes = await HouseType.find();
    res.status(200).json({
      status: "success",
      results: houseTypes.length,
      data: houseTypes,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      message: "Failed to fetch houseTypes",
    });
  }
}

export default GetAllHousesType;
