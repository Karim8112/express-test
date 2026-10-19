import DeleteVideo from "../controllers/Video/DELETE.js";
import express from "express";
import GetAllVideo from "../controllers/Video/GET_ALL.js";
import GetVideoById from "../controllers/Video/GET.js";
import patchVideo from "../controllers/Video/PATCH.js";
import postVideo from "../controllers/Video/POST.js";
import protectRoute from "../controllers/Auth/protectRoute.js";

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

router
  .route(`/video/:id`)
  .delete(protectRoute, DeleteVideo /* ,checkId */)
  .get(GetVideoById /* ,checkId */)
  .patch(protectRoute, patchVideo /* ,checkId */);
// tours
router.route(`/video`).get(GetAllVideo).post(protectRoute, postVideo);

export default router;
