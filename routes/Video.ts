import DeleteVideo from "../controllers/Video/DELETE.js";
import express from "express";
import GetAllVideo from "../controllers/Video/GET_ALL.js";
import GetVideoById from "../controllers/Video/GET.js";
import patchVideo from "../controllers/Video/PATCH.js";
import postVideo from "../controllers/Video/POST.js";
import protectRoute from "../controllers/Auth/protectRoute.js";
import uploadPhotoController from "../controllers/Team/uploadPhoto.js";
const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

router
  .route(`/project/:id`)
  .delete(protectRoute, DeleteVideo /* ,checkId */)
  .get(GetVideoById /* ,checkId */)
  .patch(protectRoute, uploadPhotoController, patchVideo /* ,checkId */);
// tours
router.route(`/project`).get(GetAllVideo).post(protectRoute, postVideo);

export default router;
