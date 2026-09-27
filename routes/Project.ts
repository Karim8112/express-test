import DeleteProject from "../controllers/Project/DELETE.js";
import express from "express";
import GetAllProject from "../controllers/Project/GET_ALL.js";
import GetProjectById from "../controllers/Project/GET.js";
import patchProject from "../controllers/Project/PATCH.js";
import postProject from "../controllers/Project/POST.js";
import protectRoute from "../controllers/Auth/protectRoute.js";
const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

router
  .route(`/project/:id`)
  .delete(protectRoute, DeleteProject /* ,checkId */)
  .get(GetProjectById /* ,checkId */)
  .patch(protectRoute, patchProject /* ,checkId */);
// tours
router.route(`/project`).get(GetAllProject).post(protectRoute, postProject);

export default router;
