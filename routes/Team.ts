import DeleteTeam from "../controllers/Team/DELETE.js";
import express from "express";
import GetAllTeam from "../controllers/Team/GET_ALL.js";
import GetTeamById from "../controllers/Team/GET.js";
import patchTeam from "../controllers/Team/PATCH.js";
import postTeam from "../controllers/Team/POST.js";
import protectRoute from "../controllers/Auth/protectRoute.js";
// import multer from "multer";
import {
  createCompressMiddleware,
  createUploadMiddleware,
} from "../middlewares/oneImage.js";

// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route

const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route
const teamImageFields = ["imageLeft", "imageRight"];

router
  .route(`/team/:id`)
  .delete(protectRoute, DeleteTeam /* ,checkId */)
  .get(GetTeamById /* ,checkId */)
  .patch(
    protectRoute,
    createUploadMiddleware(teamImageFields),
    createCompressMiddleware(teamImageFields),
    patchTeam /* ,checkId */,
  );
// tours
router
  .route(`/team`)
  .get(GetAllTeam)
  .post(
    protectRoute,
    createUploadMiddleware(teamImageFields),
    createCompressMiddleware(teamImageFields),
    postTeam,
  );

export default router;
