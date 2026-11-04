import { HouseType } from "../../models/Estate.js";
import express from "express";

const PostHouseType = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const houseType = await HouseType.create(req.body);
    if (houseType) {
      res.status(200).json({
        status: "success",
        data: {
          houseType: houseType,
        },
      });
    }
  } catch {
    res.status(400).json({
      status: "fail",
      message: "failed to add house type",
    });
  }
};

export default PostHouseType;
