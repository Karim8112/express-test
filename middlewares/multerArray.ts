import multer from "multer";
import sharp from "sharp";
import express from "express";

// Configure Multer in-RAM memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

/**
 * 1. Dynamic Multer Middleware Factory for Image Arrays
 * Configures Multer to receive an array of files under a single field key.
 *
 * @param fieldName - The field key sent in FormData (e.g., 'images')
 * @param maxCount - Maximum number of allowed files (default: 10)
 */
export const uploadImageArrayMiddleware = (
  fieldName: string = "images",
  maxCount: number = 10,
) => {
  return upload.array(fieldName, maxCount);
};

export interface CompressArrayOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  effort?: number;
}

/**
 * 2. Dynamic Sharp Compression Factory for Image Arrays
 * Processes req.files (Express.Multer.File[]) in parallel:
 * - Downscales large pixel dimensions while preserving aspect ratio
 * - Converts each file buffer to WebP
 * - Applies lossy quality compression (default: 75% quality, effort 6)
 *
 * @param options - Custom width, height, quality, and compression effort settings
 */
export const compressImageArrayMiddleware = (
  options: CompressArrayOptions = {},
) => {
  const {
    maxWidth = 800,
    maxHeight = 1000,
    quality = 75,
    effort = 6,
  } = options;

  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      // When upload.array() is used, req.files is an array of files
      const files = req.files as Express.Multer.File[] | undefined;

      if (!files || files.length === 0) {
        return next();
      }

      console.log(
        `📸 [Sharp]: Compressing ${files.length} uploaded image(s)...`,
      );

      // Core optimizer function for an individual file buffer in the array
      const optimizeBuffer = async (file: Express.Multer.File) => {
        const originalSizeBytes = file.buffer.length;

        const processedBuffer = await sharp(file.buffer)
          .resize({
            width: maxWidth,
            height: maxHeight,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({
            quality,
            effort,
            smartSubsample: true,
          })
          .toBuffer();

        // Replace raw buffer in RAM with compressed WebP buffer
        file.buffer = processedBuffer;
        file.mimetype = "image/webp";

        // Update file extension in originalname
        const nameWithoutExt =
          file.originalname.substring(0, file.originalname.lastIndexOf(".")) ||
          file.originalname;
        file.originalname = `${nameWithoutExt}.webp`;

        const compressedSizeBytes = processedBuffer.length;
        console.log(
          `   - ${file.originalname}: ` +
            `${(originalSizeBytes / 1024 / 1024).toFixed(2)} MB ➔ ` +
            `${(compressedSizeBytes / 1024).toFixed(2)} KB`,
        );
      };

      // Process all image buffers concurrently in parallel
      await Promise.all(files.map((file) => optimizeBuffer(file)));

      next();
    } catch (error) {
      console.error("Image Array Compression Error:", error);
      res.status(500).json({
        status: "fail",
        message: "Error processing and compressing image array.",
      });
    }
  };
};
