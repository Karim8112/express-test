import multer from "multer";
import sharp from "sharp";
import express from "express";

// ==========================================
// 1. Multer Memory Storage Setup
// ==========================================
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 }, // 10MB limit (accepts high-res camera photos)
  fileFilter: (req, file, cb) => {
    // Only accept image MIME types
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"));
    }
  },
});

/**
 * Multer middleware parsing both 'imageLeft' and 'imageRight' fields in a single stream pass
 */
export const uploadTeamImages = upload.fields([
  { name: "imageLeft", maxCount: 1 },
  { name: "imageRight", maxCount: 1 },
]);

// ==========================================
// 2. Sharp Compression & Optimization Middleware
// ==========================================
/**
 * Processes req.files buffers in RAM:
 * - Resizes max dimensions (1200x1600 max)
 * - Sharpens details for crisp display
 * - Converts to WebP format at 80% quality
 * - Replaces raw file buffer with optimized buffer
 */
export async function compressTeamImages(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const files = req.files as
      | { [fieldname: string]: Express.Multer.File[] }
      | undefined;

    // If no files were uploaded, move to next middleware
    if (!files || Object.keys(files).length === 0) {
      return next();
    }

    const processTasks: Promise<void>[] = [];

    // Helper function to optimize a single Multer file buffer
    const optimizeBuffer = async (file: Express.Multer.File) => {
      const processedBuffer = await sharp(file.buffer)
        // Downscale large dimensions while keeping aspect ratio
        .resize({
          width: 1200, // Max width 1200px
          height: 1600, // Max height 1600px
          fit: "inside", // Preserves aspect ratio without cropping
          withoutEnlargement: true, // Prevents expanding smaller images
        })
        // Enhance visual clarity and edges
        .sharpen()
        // Compress and convert to WebP
        .webp({
          quality: 80, // 80% quality = optimal clarity-to-size balance
          effort: 6, // Compression effort level (1-6)
        })
        .toBuffer();

      // Overwrite raw file buffer with compressed buffer
      file.buffer = processedBuffer;
      file.mimetype = "image/webp";

      // Update filename extension to .webp
      const nameWithoutExt =
        file.originalname.substring(0, file.originalname.lastIndexOf(".")) ||
        file.originalname;
      file.originalname = `${nameWithoutExt}.webp`;
    };

    // Process imageLeft if present
    if (files.imageLeft && files.imageLeft[0]) {
      processTasks.push(optimizeBuffer(files.imageLeft[0]));
    }

    // Process imageRight if present
    if (files.imageRight && files.imageRight[0]) {
      processTasks.push(optimizeBuffer(files.imageRight[0]));
    }

    // Run optimizations concurrently in parallel
    await Promise.all(processTasks);

    next();
  } catch (error) {
    console.error("Image Compression Error:", error);
    res.status(500).json({
      status: "fail",
      message: "Error processing and compressing images.",
    });
  }
}

export default uploadTeamImages;
