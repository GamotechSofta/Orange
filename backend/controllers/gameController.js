const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const Game = require("../models/Game");

/**
 * @desc    List active games for the homepage grid
 * @route   GET /api/games
 * @access  Public
 */
const getGames = asyncHandler(async (req, res) => {
  const items = await Game.find({ active: true }).sort({ order: 1, createdAt: 1 });
  res.json({ success: true, count: items.length, data: items });
});

const createGame = asyncHandler(async (req, res) => {
  const item = await Game.create(req.body);
  res.status(201).json({ success: true, data: item });
});

const getGameById = asyncHandler(async (req, res) => {
  const item = await Game.findById(req.params.id);
  if (!item) throw new ApiError(404, "Game not found");
  res.json({ success: true, data: item });
});

const updateGame = asyncHandler(async (req, res) => {
  const item = await Game.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) throw new ApiError(404, "Game not found");
  res.json({ success: true, data: item });
});

const deleteGame = asyncHandler(async (req, res) => {
  const item = await Game.findByIdAndDelete(req.params.id);
  if (!item) throw new ApiError(404, "Game not found");
  res.json({ success: true, message: "Game removed" });
});

module.exports = {
  getGames,
  createGame,
  getGameById,
  updateGame,
  deleteGame,
};
