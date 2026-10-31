import GetAll from "../../controllers/Landing/Get_All.js";
import express from "express";

const router = express.Router();

router.route(`/landing-page`).get(GetAll);

export default router;
