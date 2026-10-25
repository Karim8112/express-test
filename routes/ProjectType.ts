import DeleteProjectType from "../controllers/ProjectType/DELETE.js";
import express from "express";
import GetAllProjectType from "../controllers/ProjectType/GET_ALL.js";
import patchProjectType from "../controllers/ProjectType/PATCH.js";
import postProjectType from "../controllers/ProjectType/POST.js";
import protectRoute from "../controllers/Auth/protectRoute.js";

// -----------middlewares----------

const router = express.Router();
// -----------middlewares----------

router
  .route(`/team/:id`)
  .delete(protectRoute, DeleteProjectType /* ,checkId */)
  .patch(protectRoute, patchProjectType /* ,checkId */);
// tours
router
  .route(`/team`)
  .get(GetAllProjectType)
  .post(protectRoute, postProjectType);

export default router;
