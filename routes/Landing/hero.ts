import GetAll from "../../controllers/Landing/Hero/Get_All.js";
import express from "express";
import PATCH from "../../controllers/Landing/Hero/PATCH.js";
import protectRoute from "../../controllers/Auth/protectRoute.js";

// import multer from "multer";
import {
  createCompressMiddleware,
  createUploadMiddleware,
} from "../../middlewares/oneImage.js";

// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route
const Fields = ["heroImage"];

router
  .route(`/hero/:id`)
  .patch(
    protectRoute,
    createUploadMiddleware(Fields),
    createCompressMiddleware(Fields, { quality: 100, effort: 4 }),
    PATCH /* ,checkId */,
  );
// tours
router.route(`/hero`).get(protectRoute, GetAll);

export default router;
