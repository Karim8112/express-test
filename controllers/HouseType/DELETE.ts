import { HouseType } from "../../models/Estate.js";
import { House } from "../../models/Estate.js";
import express from "express";

const DeleteHouseType = async function (
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

    const housesFound = await House.find({ houseType: id });

    if (housesFound.length > 0) {
      res.status(400).json({
        status: "failed",
        message: "House Types has houses and can't be deleted",
      });
      return;
    }

    const houseTypeDeleted = await HouseType.findByIdAndDelete(id);

    if (houseTypeDeleted) {
      res.status(200).json({
        status: "success",
        data: { HouseType: houseTypeDeleted },
      });
    }
  } catch {
    res.status(400).json({
      status: "fail",
      message: "failed to delete house type",
    });
  }
};

export default DeleteHouseType;
