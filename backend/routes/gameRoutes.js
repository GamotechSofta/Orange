const express = require("express");
const {
  getGames,
  createGame,
  getGameById,
  updateGame,
  deleteGame,
} = require("../controllers/gameController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getGames)
  .post(protect, authorize("admin"), createGame);

router
  .route("/:id")
  .get(getGameById)
  .put(protect, authorize("admin"), updateGame)
  .delete(protect, authorize("admin"), deleteGame);

module.exports = router;
