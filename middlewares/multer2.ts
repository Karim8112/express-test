import multer from "multer";
import sharp from "sharp";
import express from "express";

// Configure Multer in-RAM memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB per file limit
  fileFilter: (req, file, cb) => {
    // Only allow image MIME types
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

/**
 * 1. Dynamic Multer Upload Factory
 * Accepts an array of field names and configures Multer to extract them into RAM.
 *
 * @param fieldNames - Array of field keys (e.g. ['imageLeft', 'imageRight'])
 * @param maxCount - Max files per field (default: 1)
 */
export const createUploadMiddleware = (
  fieldNames: string[],
  maxCount: number = 1,
) => {
  const fields = fieldNames.map((name) => ({ name, maxCount }));
  return upload.fields(fields);
};

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  effort?: number;
}

/**
 * 2. Dynamic Sharp Compression Factory
 * Processes incoming req.files buffers dynamically:
 * - Downscales large dimensions (maintains aspect ratio, no upscaling)
 * - Converts to optimized WebP format
 * - Applies lossy compression (default 75% quality, effort level 6)
 * - Executes field processing concurrently in parallel
 *
 * @param fieldNames - Array of field keys to process (e.g. ['imageLeft', 'imageRight'])
 * @param options - Custom width, height, quality, and compression effort settings
 */
export const createCompressMiddleware = (
  fieldNames: string[],
  options: CompressOptions = {},
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
      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      // Skip directly to next middleware if no files were uploaded
      if (!files || Object.keys(files).length === 0) {
        return next();
      }

      const processTasks: Promise<void>[] = [];

      // Core optimizer function for individual Multer file buffers
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

        // Replace raw buffer in RAM with optimized buffer
        file.buffer = processedBuffer;
        file.mimetype = "image/webp";

        // Update file extension in originalname
        const nameWithoutExt =
          file.originalname.substring(0, file.originalname.lastIndexOf(".")) ||
          file.originalname;
        file.originalname = `${nameWithoutExt}.webp`;

        const compressedSizeBytes = processedBuffer.length;
        console.log(
          `📸 [Sharp Compression]: ${file.fieldname} reduced from ` +
            `${(originalSizeBytes / 1024 / 1024).toFixed(2)} MB ➔ ` +
            `${(compressedSizeBytes / 1024).toFixed(2)} KB`,
        );
      };

      // Loop dynamically over every field passed to the factory
      for (const fieldName of fieldNames) {
        if (files[fieldName] && files[fieldName].length > 0) {
          files[fieldName].forEach((file) => {
            processTasks.push(optimizeBuffer(file));
          });
        }
      }

      // Execute all compression jobs in parallel
      await Promise.all(processTasks);
      next();
    } catch (error) {
      console.error("Dynamic Image Compression Error:", error);
      res.status(500).json({
        status: "fail",
        message: "Error processing and compressing uploaded images.",
      });
    }
  };
};
