import express from "express";
import { list } from "../../../models/Landing.js";

/**
 * DELETE /api/v1/list/:id
 * Deletes a List item by its ObjectId.
 */
async function deleteList(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    const deletedItem = await list.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({
        status: "failed",
        message: "List item not found",
      });
    }

    return res.status(200).json({
      status: "success",
      data: {
        list: deletedItem,
      },
    });
  } catch (error) {
    console.error("DeleteList Error:", error);
    return res.status(400).json({
      status: "failed",
      message: "Error deleting List item",
    });
  }
}

export default deleteList;
