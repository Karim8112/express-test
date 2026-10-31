import express from "express";
import { whatWeDo } from "../../../models/Landing.js";

/**
 * DELETE /api/v1/what-we-do/:id
 * Deletes a WhatWeDo entry by ID.
 */
export async function deleteWhatWeDo(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    const item = await whatWeDo.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        status: "failed",
        message: "WhatWeDo item not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        whatWeDo: item,
      },
    });
  } catch (error) {
    console.error("DeleteWhatWeDo Error:", error);
    return res.status(400).json({
      status: "failed",
      message: error,
    });
  }
}

export default deleteWhatWeDo;
