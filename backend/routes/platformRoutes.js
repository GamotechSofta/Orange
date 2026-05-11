const express = require("express");
const {
  getPlatforms,
  createPlatform,
  getPlatformById,
  updatePlatform,
  deletePlatform,
} = require("../controllers/platformController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router
  .route("/")
  .get(getPlatforms)
  .post(protect, authorize("admin"), createPlatform);

router
  .route("/:id")
  .get(getPlatformById)
  .put(protect, authorize("admin"), updatePlatform)
  .delete(protect, authorize("admin"), deletePlatform);

module.exports = router;
