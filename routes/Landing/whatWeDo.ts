import GetAll from "../../controllers/Landing/WhatWeDo/Get_All.js";
import express from "express";
import PATCH from "../../controllers/Landing/WhatWeDo/PATCH.js";
import POST from "../../controllers/Landing/WhatWeDo/POST.js";
import DELETE from "../../controllers/Landing/WhatWeDo/DELETE.js";

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
const Fields = ["image"];

router
  .route(`/what-we-do/:id`)
  .patch(
    protectRoute,
    createUploadMiddleware(Fields),
    createCompressMiddleware(Fields, {
      quality: 85,
      effort: 6,
      maxHeight: 1440,
      maxWidth: 2560,
    }),
    PATCH /* ,checkId */,
  )
  .delete(protectRoute, DELETE /* ,checkId */);
// tours
router
  .route(`/what-we-do`)
  .get(protectRoute, GetAll)
  .post(
    protectRoute,
    createUploadMiddleware(Fields),
    createCompressMiddleware(Fields, {
      quality: 85,
      effort: 6,
      maxHeight: 1440,
      maxWidth: 2560,
    }),
    POST,
  );

export default router;
