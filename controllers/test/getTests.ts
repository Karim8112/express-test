import express from "express";
import { Test } from "../../models/test.js";

async function GetAllTest(req: express.Request, res: express.Response) {
  try {
    const test = await Test.find();
    res.status(200).json({
      status: "success",
      results: test.length,
      data: test,
    });
  } catch {
    res.status(400).json({
      status: "fail",
      message: "Failed to fetch tests",
    });
  }
}

export default GetAllTest;
