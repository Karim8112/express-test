import multer from "multer";
const upload = multer({
  dest: "static",
  limits: { fileSize: 50, files: 1, fieldSize: 50 },
});
const uploadPhotoController = upload.single("photo");

export default uploadPhotoController;
