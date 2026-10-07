import multer from "multer";
const upload = multer({
  dest: "static",
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
});
const uploadPhotoController = upload.single("photo");

export default uploadPhotoController;
