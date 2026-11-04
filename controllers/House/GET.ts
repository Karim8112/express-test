import { House } from "../../models/Estate.js";
import express from "express";
import { HouseType } from "../../models/Estate.js";

async function GetHouseById(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;
  let houseType;
  let updatedHouseBody;
  try {
    const house = await House.findById(id);
    if (house) {
      try {
        houseType = await HouseType.findById(house.houseType._id);

        updatedHouseBody = { ...house.toObject(), houseType };
      } catch (err) {
        res.status(400).json({
          status: "failed",
          message: err,
        });
        return;
      }
    }

    res.status(200).json(updatedHouseBody ?? house);
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
    return;
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default GetHouseById;
