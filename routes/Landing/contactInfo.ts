import GetAll from "../../controllers/Landing/ContactInfo/Get_All.js";
import express from "express";
import PATCH from "../../controllers/Landing/ContactInfo/PATCH.js";

import protectRoute from "../../controllers/Auth/protectRoute.js";

// import multer from "multer";

// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

router.route(`/contact-info/:id`).patch(protectRoute, PATCH /* ,checkId */);

// tours
router.route(`/contact-info`).get(protectRoute, GetAll);

export default router;
