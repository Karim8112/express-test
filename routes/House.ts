import Delete from "../controllers/House/DELETE.js";
import express from "express";
import GetAll from "../controllers/House/GET_ALL.js";
import GetById from "../controllers/House/GET.js";
import patch from "../controllers/House/PATCH.js";
import post from "../controllers/House/POST.js";
import protectRoute from "../controllers/Auth/protectRoute.js";
import {
  CompressImages,
  type FieldConfig,
  UploadImages,
} from "../middlewares/multipleImages.js";

const Fields: FieldConfig[] = [
  { name: "mainImage" },
  { name: "images", maxCount: 30 },
];

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

router
  .route(`/house/:id`)
  .delete(protectRoute, Delete /* ,checkId */)
  .get(GetById /* ,checkId */)
  .patch(
    protectRoute,
    UploadImages(Fields),
    CompressImages(Fields),
    patch /* ,checkId */,
  );
// tours
router
  .route(`/house`)
  .get(GetAll)
  .post(protectRoute, UploadImages(Fields), CompressImages(Fields), post);

export default router;
