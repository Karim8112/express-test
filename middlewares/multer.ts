import multer from "multer";

// Configure memory storage so files are kept as buffers in RAM
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB per file limit
});

// Parse both fields in one single pass over the incoming HTTP stream
export const uploadTeamImages = upload.fields([
  { name: "imageLeft", maxCount: 1 },
  { name: "imageRight", maxCount: 1 },
]);

export default uploadTeamImages;
