import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// Multer middleware to extract the field named "imageLeft"
// ================================
export const iamgeLeft = upload.single("imageLeft");
export const imageRight = upload.single("imageRight");
