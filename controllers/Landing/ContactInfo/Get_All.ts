import express from "express";
import { contactInfo } from "../../../models/Landing.js";

async function GetAllContactInfo(req: express.Request, res: express.Response) {
  try {
    const filter: Record<string, unknown> = {};

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let totalContactInfo = 0;

    if (req.query.page) {
      totalContactInfo = await contactInfo.countDocuments(filter);
      if (totalContactInfo <= skip) {
        return res.status(404).json({
          status: "failed",
          message: "page not found",
        });
      }
    }

    const contactInfoData = await contactInfo
      .find(filter)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: contactInfoData.length,
      total: totalContactInfo || contactInfoData.length,
      data: contactInfoData,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to fetch ContactInfo entries",
    });
  }
}

export default GetAllContactInfo;
