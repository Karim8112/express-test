import express from "express";
import multer from "multer";
import sharp from "sharp";

// Configure Multer in-RAM memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

export interface FieldConfig {
  name: string;
  maxCount?: number; // Set 1 for single fields, or >1 for array fields
}

/**
 * 1. Unified Multer Upload Factory
 * Parses all single and array image fields in a single pass over the HTTP stream.
 */
export const UploadImages = (fields: FieldConfig[]) => {
  const multerFields = fields.map((f) => ({
    name: f.name,
    maxCount: f.maxCount || 10,
  }));
  return upload.fields(multerFields);
};

export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
}

/**
 * 2. Unified Sharp Compression Factory
 * Concurrently resizes and compresses all files in req.files using WebP format.
 */
export const CompressImages = (
  fields: FieldConfig[],
  options: CompressOptions = {},
) => {
  const { maxWidth = 800, maxHeight = 1000, quality = 75 } = options;

  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const files = req.files as
        | { [fieldname: string]: Express.Multer.File[] }
        | undefined;

      if (!files || Object.keys(files).length === 0) {
        return next();
      }

      const processTasks: Promise<void>[] = [];

      // Core optimizer for individual buffers
      const optimizeBuffer = async (file: Express.Multer.File) => {
        const originalSizeBytes = file.buffer.length;

        const processedBuffer = await sharp(file.buffer)
          .resize({
            width: maxWidth,
            height: maxHeight,
            fit: "inside",
            withoutEnlargement: true,
          })
          .webp({ quality, effort: 6, smartSubsample: true })
          .toBuffer();

        // Replace raw buffer in memory with compressed buffer
        file.buffer = processedBuffer;
        file.mimetype = "image/webp";

        const compressedSizeBytes = processedBuffer.length;
        console.log(
          `📸 [Sharp Compression]: ${file.fieldname} reduced from ` +
            `${(originalSizeBytes / 1024 / 1024).toFixed(2)} MB ➔ ` +
            `${(compressedSizeBytes / 1024).toFixed(2)} KB`,
        );
      };

      // Iterate through configured fields and process file buffers concurrently
      for (const field of fields) {
        const fileArray = files[field.name];
        if (fileArray && fileArray.length > 0) {
          fileArray.forEach((file) => {
            processTasks.push(optimizeBuffer(file));
          });
        }
      }

      await Promise.all(processTasks);
      next();
    } catch (error) {
      console.error("Unified Image Compression Error:", error);
      res.status(500).json({
        status: "fail",
        message: "Error processing uploaded images.",
      });
    }
  };
};
