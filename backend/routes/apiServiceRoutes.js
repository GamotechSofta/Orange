const express = require("express");
const {
  getApiServices,
  getAllApiServicesAdmin,
  createApiService,
  getApiServiceById,
  updateApiService,
  deleteApiService,
} = require("../controllers/apiServiceController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/all", protect, authorize("admin"), getAllApiServicesAdmin);

router
  .route("/")
  .get(getApiServices)
  .post(protect, authorize("admin"), createApiService);

router
  .route("/:id")
  .get(getApiServiceById)
  .put(protect, authorize("admin"), updateApiService)
  .delete(protect, authorize("admin"), deleteApiService);

module.exports = router;
