import multer from "multer";
// import { Team } from "../../models/Team.js";
import express from "express";
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const teamId = req.params.id;
    cb(null, `static/images/${teamId}/iamgeLeft`);
  },
  filename: (request: express.Request, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `imageLeft.${ext}`);
  },
});

const multerFilter = (
  req: any,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback,
) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true);
  } else {
    callback(null, false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
});
const uploadPhotoController = upload.single("photo");

export default uploadPhotoController;
