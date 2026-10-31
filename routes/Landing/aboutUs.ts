import GetAll from "../../controllers/Landing/AboutUs/Get_All.js";
import express from "express";
import PATCH from "../../controllers/Landing/AboutUs/PATCH.js";

import protectRoute from "../../controllers/Auth/protectRoute.js";

// import multer from "multer";
import {
  CompressImages,
  UploadImages,
  type CompressOptions,
  type FieldConfig,
} from "../../middlewares/multipleImages.js";

// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route
const Fields: FieldConfig[] = [{ name: "images", maxCount: 20 }];
const CompSettings: CompressOptions = { effort: 4, quality: 100 };

router
  .route(`/about-us/:id`)
  .patch(
    protectRoute,
    UploadImages(Fields),
    CompressImages(Fields, CompSettings),
    PATCH /* ,checkId */,
  );

// tours
router.route(`/about-us`).get(protectRoute, GetAll);

export default router;
