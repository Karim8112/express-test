import GetAll from "../../controllers/Landing/List/Get_All.js";
import express from "express";
import PATCH from "../../controllers/Landing/List/PATCH.js";
import POST from "../../controllers/Landing/List/POST.js";
import DELETE from "../../controllers/Landing/List/DELETE.js";

import protectRoute from "../../controllers/Auth/protectRoute.js";
import {
  createCompressMiddleware,
  createUploadMiddleware,
} from "../../middlewares/oneImage.js";

// import multer from "multer";

// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route
const Fields = ["image"];

router
  .route(`/list/:id`)
  .patch(
    protectRoute,
    createUploadMiddleware(Fields),
    createCompressMiddleware(Fields, { quality: 100, effort: 4 }),
    PATCH,
  )
  .delete(protectRoute, DELETE);

// tours
router
  .route(`/list`)
  .get(protectRoute, GetAll)
  .post(
    protectRoute,
    createUploadMiddleware(Fields),
    createCompressMiddleware(Fields, { quality: 100, effort: 4 }),
    POST,
  );

export default router;
