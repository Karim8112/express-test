import express from "express";
import { contactInfo } from "../../../models/Landing.js";

/**
 * PATCH /api/v1/contact-info/:id
 * Updates contact numbers, emails, and address list.
 */
async function patchContactInfo(
  req: express.Request<{ id: string }>,
  res: express.Response,
) {
  const { id } = req.params;

  try {
    // 1. Verify contact info document exists
    const contact = await contactInfo.findById(id);
    if (!contact) {
      return res.status(404).json({
        status: "failed",
        message: "Contact Info document not found",
      });
    }

    const updatedBody: Record<string, unknown> = { ...req.body };

    // 2. Ensure string array inputs (numbers, emails, address) are properly formatted as arrays
    if (req.body.numbers !== undefined) {
      updatedBody.numbers = Array.isArray(req.body.numbers)
        ? req.body.numbers
        : [req.body.numbers];
    }

    if (req.body.emails !== undefined) {
      updatedBody.emails = Array.isArray(req.body.emails)
        ? req.body.emails
        : [req.body.emails];
    }

    if (req.body.address !== undefined) {
      updatedBody.address = Array.isArray(req.body.address)
        ? req.body.address
        : [req.body.address];
    }

    // 3. Update document in Database
    const updatedContactInfo = await contactInfo.findByIdAndUpdate(
      id,
      updatedBody,
      {
        new: true,
        runValidators: true,
      },
    );

    return res.status(200).json({
      status: "success",
      data: {
        contactInfo: updatedContactInfo,
      },
    });
  } catch (error) {
    console.error("PatchContactInfo Error:", error);
    return res.status(400).json({
      status: "failed",
      message: "Error updating Contact Info section",
    });
  }
}

export default patchContactInfo;
