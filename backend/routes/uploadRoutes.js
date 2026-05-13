const express = require("express");
const multer = require("multer");
const ApiError = require("../utils/ApiError");
const { protect, authorize } = require("../middleware/authMiddleware");
const { uploadImageMemory } = require("../middleware/uploadMemory");
const { uploadImage } = require("../controllers/uploadController");

const router = express.Router();

router.post(
  "/image",
  protect,
  authorize("admin"),
  (req, res, next) => {
    uploadImageMemory.single("image")(req, res, (err) => {
      if (!err) return next();
      if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
        return next(new ApiError(400, "Image too large (max 8MB)"));
      }
      return next(err);
    });
  },
  uploadImage
);

module.exports = router;
