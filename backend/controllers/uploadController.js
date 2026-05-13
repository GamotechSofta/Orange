const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { cloudinary, ensureCloudinaryConfig } = require("../config/cloudinary");

/**
 * @desc    Upload one image to Cloudinary (admin)
 * @route   POST /api/upload/image
 * @access  Private / admin
 */
const uploadImage = asyncHandler(async (req, res) => {
  if (!ensureCloudinaryConfig()) {
    throw new ApiError(
      503,
      "Image upload is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in the server environment."
    );
  }

  if (!req.file?.buffer) {
    throw new ApiError(400, "No image file provided (use field name \"image\")");
  }

  const folder = (process.env.CLOUDINARY_UPLOAD_FOLDER || "orange/games").replace(/^\/+|\/+$/g, "");

  const dataUri = `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`;

  const result = await cloudinary.uploader.upload(dataUri, {
    folder,
    resource_type: "image",
  });

  res.status(201).json({
    success: true,
    data: {
      url: result.secure_url,
      publicId: result.public_id,
    },
  });
});

module.exports = { uploadImage };
