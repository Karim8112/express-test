import { HouseType } from "../../models/Estate.js";
import express from "express";

const PatchHouseType = async function (
  req: express.Request,
  res: express.Response,
) {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(404).json({
        status: "fail",
        message: "house type not found",
      });
      return;
    }

    const houseType = await HouseType.findByIdAndUpdate(id, req.body);
    if (HouseType) {
      res.status(200).json({
        status: "success",
        data: { HTMLAreaElementouseType: houseType },
      });
    }
  } catch {
    res.status(400).json({
      status: "fail",
      message: "failed to update house type",
    });
  }
};

export default PatchHouseType;
