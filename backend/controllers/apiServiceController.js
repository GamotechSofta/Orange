const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiService = require("../models/ApiService");

/**
 * @desc    List active API services for the homepage grid
 * @route   GET /api/api-services
 * @access  Public
 */
const getApiServices = asyncHandler(async (req, res) => {
  const items = await ApiService.find({ active: true }).sort({ order: 1, createdAt: 1 });
  res.json({ success: true, count: items.length, data: items });
});

const createApiService = asyncHandler(async (req, res) => {
  const item = await ApiService.create(req.body);
  res.status(201).json({ success: true, data: item });
});

const getApiServiceById = asyncHandler(async (req, res) => {
  const item = await ApiService.findById(req.params.id);
  if (!item) throw new ApiError(404, "API service not found");
  res.json({ success: true, data: item });
});

const updateApiService = asyncHandler(async (req, res) => {
  const item = await ApiService.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, "API service not found");
  res.json({ success: true, data: item });
});

const deleteApiService = asyncHandler(async (req, res) => {
  const item = await ApiService.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, "API service not found");
  res.json({ success: true, message: "API service removed" });
});

module.exports = {
  getApiServices,
  createApiService,
  getApiServiceById,
  updateApiService,
  deleteApiService,
};
