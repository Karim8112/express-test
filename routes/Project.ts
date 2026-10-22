import DeleteProject from "../controllers/Project/DELETE.js";
import express from "express";
import GetAllProject from "../controllers/Project/GET_ALL.js";
import GetProjectById from "../controllers/Project/GET.js";
import patchProject from "../controllers/Project/PATCH.js";
import postProject from "../controllers/Project/POST.js";
import protectRoute from "../controllers/Auth/protectRoute.js";
import {
  compressImageArrayMiddleware,
  uploadImageArrayMiddleware,
} from "../middlewares/multerArray.js";

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

router
  .route(`/project/:id`)
  .delete(protectRoute, DeleteProject /* ,checkId */)
  .get(GetProjectById /* ,checkId */)
  .patch(protectRoute, patchProject /* ,checkId */);
// tours
router
  .route(`/project`)
  .get(GetAllProject)
  .post(
    protectRoute,
    uploadImageArrayMiddleware("images", 10), // Accepts up to 10 files under 'images'
    compressImageArrayMiddleware({
      maxWidth: 1000,
      maxHeight: 1200,
      quality: 80,
    }),
    postProject,
  );

export default router;
