import login from "../controllers/Auth/auth.js";
import express from "express";

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

router.post(`/login`, login);

export default router;
