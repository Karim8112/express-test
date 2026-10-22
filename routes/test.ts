import express from "express";
import {
  uploadImageArrayMiddleware,
  compressImageArrayMiddleware,
} from "../middlewares/multerArray.js";
import { AddImages } from "../controllers/test/postTest.js";
import protectRoute from "../controllers/Auth/protectRoute.js";
import GetAllTest from "../controllers/test/getTests.js";

const router = express.Router();

router
  .route("/test")
  .get(GetAllTest)
  .post(
    protectRoute,
    uploadImageArrayMiddleware("images", 10), // Accepts up to 10 files under 'images'
    compressImageArrayMiddleware({
      maxWidth: 1000,
      maxHeight: 1200,
      quality: 80,
    }),
    AddImages,
  );

export default router;
