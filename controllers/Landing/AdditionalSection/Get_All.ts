import express from "express";
import { additionalSection } from "../../../models/Landing.js";

async function GetAllAdditionalSection(
  req: express.Request,
  res: express.Response,
) {
  try {
    const filter: Record<string, unknown> = {};

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    let totalSections = 0;

    if (req.query.page) {
      totalSections = await additionalSection.countDocuments(filter);
      if (totalSections <= skip) {
        return res.status(404).json({
          status: "failed",
          message: "page not found",
        });
      }
    }

    const sections = await additionalSection
      .find(filter)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      results: sections.length,
      total: totalSections || sections.length,
      data: sections,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "Failed to fetch Additional Section entries",
    });
  }
}

export default GetAllAdditionalSection;
