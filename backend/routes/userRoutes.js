const express = require("express");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").get(getUsers).post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .put(protect, updateUser)
  .delete(protect, authorize("admin"), deleteUser);

module.exports = router;
