const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

/**
 * @desc    Register a new user and return JWT
 * @route   POST /api/auth/register
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "name, email and password are required");
  }

  const exists = await User.findOne({ email });
  if (exists) throw new ApiError(409, "Email already registered");

  const user = await User.create({ name, email, password });

  res.status(201).json({
    success: true,
    data: user,
    token: generateToken(user._id),
  });
});

/**
 * @desc    Authenticate user and return JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "email and password are required");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.role !== "admin") {
    throw new ApiError(403, "Admin panel access requires an admin account");
  }

  res.json({
    success: true,
    data: user,
    token: generateToken(user._id),
  });
});

/**
 * @desc    Get currently authenticated user
 * @route   GET /api/auth/me
 * @access  Private
 */
const getMe = asyncHandler(async (req, res) => {
  res.json({ success: true, data: req.user });
});

/**
 * @desc    Update logged-in user profile (name, email, optional password)
 * @route   PUT /api/auth/me
 * @access  Private
 */
const updateMe = asyncHandler(async (req, res) => {
  const { name, email, currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");
  if (!user) throw new ApiError(401, "User not found");

  if (name !== undefined && name !== null) {
    const trimmed = String(name).trim();
    if (!trimmed) throw new ApiError(400, "Name cannot be empty");
    user.name = trimmed;
  }

  if (email !== undefined && email !== null) {
    const nextEmail = String(email).trim().toLowerCase();
    if (nextEmail !== user.email) {
      const taken = await User.findOne({ email: nextEmail });
      if (taken) throw new ApiError(409, "Email already in use");
      user.email = nextEmail;
    }
  }

  if (newPassword) {
    if (!currentPassword) {
      throw new ApiError(400, "Current password is required to set a new password");
    }
    if (!(await user.matchPassword(currentPassword))) {
      throw new ApiError(401, "Current password is incorrect");
    }
    if (String(newPassword).length < 6) {
      throw new ApiError(400, "New password must be at least 6 characters");
    }
    user.password = newPassword;
  }

  const updated = await user.save();
  const out = updated.toJSON();
  res.json({ success: true, data: out });
});

module.exports = { registerUser, loginUser, getMe, updateMe };
