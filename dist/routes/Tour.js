import DeleteTour from "../controllers/Tours/DELETE.js";
import express from "express";
import GetAllTours from "../controllers/Tours/GET_ALL.js";
import GetTourById from "../controllers/Tours/GET.js";
import patchTour from "../controllers/Tours/PATCH.js";
import PostTour from "../controllers/Tours/POST.js";
const router = express.Router();
// -----------middlewares----------
// router.param('id', checkId) // so way better to use this method instead of using chain with every route
router
    .route(`/tours/:id`)
    .delete(DeleteTour /* ,checkId */)
    .get(GetTourById /* ,checkId */)
    .patch(patchTour /* ,checkId */);
// tours
router.route(`/tours`).get(GetAllTours).post(PostTour /* ,checkBody */);
export default router;
//# sourceMappingURL=Tour.js.map