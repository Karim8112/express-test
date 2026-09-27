import express, { type RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { User } from "../../models/User.js";
import { ObjectId } from "mongodb";

export const protectRoute: RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  // 1) verify token exist
  try {
    let token = req.headers.authorization;
    if (!token || !token.startsWith("Bearer")) {
      res.status(401).json({
        status: "failed",
        message: "you are not logged in!!",
      });
      return;
    }
    // 2) verify token with JWT secret (i don't hell know where the expire date?)
    token = token.split(" ")[1];
    try {
      const decoded = await jwt.verify(
        token as string,
        process.env.JWT_SECRET as string,
      );
      if (typeof decoded === "string" || !("id" in decoded)) {
        res.status(401).json({
          status: "failed",
          message: "invalid token",
        });
        return;
      }
      console.log(decoded.id);

      // verify if user exists (from its _id)
      const found_user = await User.findOne({ _id: new ObjectId(decoded.id) });

      if (!found_user) {
        res.status(401).json({
          status: "failed",
          message: "User no longer exist",
        });
        return;
      }

      // verify it the user didn't change his password later
      // passing to the next middleware
      next();
    } catch {
      res.status(401).json({
        status: "failed",
        message: "invalid token",
      });
      return;
    }
  } catch {
    res.status(401).json({
      status: "failed",
      message: "connection error",
    });
    return;
  }
};

export default protectRoute;
