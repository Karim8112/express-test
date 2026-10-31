import express from "express";
import { additionalSection } from "../../../models/Landing.js";

async function deleteAdditionalSection(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;
  try {
    const section = await additionalSection.findByIdAndDelete(id);

    if (!section) {
      return res.status(404).json({
        status: "failed",
        message: "Additional section not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        additionalSection: section,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}

export default deleteAdditionalSection;
