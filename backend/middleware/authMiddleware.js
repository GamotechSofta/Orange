const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");

/**
 * Verifies a Bearer JWT and attaches the user document to req.user.
 * Use on any protected route:  router.get("/me", protect, handler)
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, no token provided");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id).select("-password");
  if (!user) throw new ApiError(401, "Not authorized, user not found");

  req.user = user;
  next();
});

/**
 * Role gate. Usage:  router.delete("/:id", protect, authorize("admin"), handler)
 */
const authorize = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new ApiError(403, "Forbidden: insufficient permissions"));
  }
  next();
};

module.exports = { protect, authorize };
