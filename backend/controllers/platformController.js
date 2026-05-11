const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const Platform = require("../models/Platform");

/**
 * @desc    List active platform solutions, ordered for the homepage grid
 * @route   GET /api/platforms
 * @access  Public
 */
const getPlatforms = asyncHandler(async (req, res) => {
  const items = await Platform.find({ active: true }).sort({ order: 1, createdAt: 1 });
  res.json({ success: true, count: items.length, data: items });
});

/**
 * @desc    Create platform
 * @route   POST /api/platforms
 * @access  Private/Admin
 */
const createPlatform = asyncHandler(async (req, res) => {
  const platform = await Platform.create(req.body);
  res.status(201).json({ success: true, data: platform });
});

const getPlatformById = asyncHandler(async (req, res) => {
  const item = await Platform.findById(req.params.id);
  if (!item) throw new ApiError(404, "Platform not found");
  res.json({ success: true, data: item });
});

const updatePlatform = asyncHandler(async (req, res) => {
  const item = await Platform.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, "Platform not found");
  res.json({ success: true, data: item });
});

const deletePlatform = asyncHandler(async (req, res) => {
  const item = await Platform.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, "Platform not found");
  res.json({ success: true, message: "Platform removed" });
});

module.exports = {
  getPlatforms,
  createPlatform,
  getPlatformById,
  updatePlatform,
  deletePlatform,
};
