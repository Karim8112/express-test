import multer from "multer";
import fs from "fs";
import express from "express";
import path from "path";
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Safely extract the ID from the route (e.g., /team/:id)
        const teamId = req.params.id;
        // Path points outside the Node app to Hostinger's public document root
        const uploadPath = path.join(process.cwd(), "../public_html/images/team_images", teamId);
        // Creates the nested folders recursively without crashing if they exist
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Extracts the extension (e.g., 'jpeg', 'png')
        const ext = file.mimetype.split("/")[1];
        // Saving as a static name. (Note: this will overwrite the old imageLeft
        // file automatically if a new one is uploaded for the same team ID!)
        cb(null, `imageLeft.${ext}`);
    },
});
const multerFilter = (req, file, callback) => {
    if (file.mimetype.startsWith("image")) {
        callback(null, true);
    }
    else {
        // Rejects the file if it is not an image
        callback(null, false);
    }
};
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
    limits: { fileSize: 5 * 1024 * 1024, files: 1 }, // 5MB limit
});
const uploadPhotoController = upload.single("photo");
export default uploadPhotoController;
//# sourceMappingURL=uploadPhoto.js.map