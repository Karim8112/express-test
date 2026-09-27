import jwt, { type SignOptions } from "jsonwebtoken";
import { User } from "../../models/User.js";
import express from "express";

interface AuthRequestBody {
  userName?: string;
  password?: string;
}

function generateToken(_id: string) {
  const expiresIn = process.env.JWT_EXPIRES_IN;
  const signOptions: SignOptions | {} = expiresIn ? { expiresIn } : {};
  return jwt.sign({ id: _id }, process.env.JWT_SECRET as string, signOptions);
}

async function login(
  req: express.Request<AuthRequestBody>,
  res: express.Response,
) {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    if (!userName || !password) {
      res.status(400).json({
        status: "failed",
        message: "missing user name or password",
      });
    }
    const found_user = await User.findOne({ userName: userName });
    if (!found_user || found_user.password != password) {
      res.status(400).json({
        status: "failed",
        message: "user name or password is invalid",
      });
    } else {
      const token = generateToken(found_user.id as string);
      res.status(200).json({
        status: "success",
        token: token,
      });
    }
  } catch {
    res.status(400).json({
      status: "filed",
      message: "connection error",
    });
  }
}

// تشغيل الخادم والبدء في مراقبة المنفذ لتلقي طلبات العميل

export default login;
