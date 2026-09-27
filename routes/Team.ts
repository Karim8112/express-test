import DeleteTeam from "../controllers/Team/DELETE.js";
import express from "express";
import GetAllTeam from "../controllers/Team/GET_ALL.js";
import GetTeamById from "../controllers/Team/GET.js";
import patchTeam from "../controllers/Team/PATCH.js";
import postTeam from "../controllers/Team/POST.js";
import protectRoute from "../controllers/Auth/protectRoute.js";

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

router
  .route(`/team/:id`)
  .delete(protectRoute, DeleteTeam /* ,checkId */)
  .get(GetTeamById /* ,checkId */)
  .patch(protectRoute, patchTeam /* ,checkId */);
// tours
router.route(`/team`).get(GetAllTeam).post(protectRoute, postTeam);

export default router;
