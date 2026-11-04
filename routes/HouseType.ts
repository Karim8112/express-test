import Delete from "../controllers/ProjectType/DELETE.js";
import express from "express";
import GetAll from "../controllers/ProjectType/GET_ALL.js";
import patch from "../controllers/ProjectType/PATCH.js";
import post from "../controllers/ProjectType/POST.js";
import protectRoute from "../controllers/Auth/protectRoute.js";

// -----------middlewares----------

const router = express.Router();
// -----------middlewares----------

router
  .route(`/house_type/:id`)
  .delete(protectRoute, Delete /* ,checkId */)
  .patch(protectRoute, patch /* ,checkId */);
// tours
router.route(`/house_type`).get(GetAll).post(protectRoute, post);

export default router;
