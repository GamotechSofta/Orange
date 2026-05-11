const jwt = require("jsonwebtoken");

/**
 * Signs a JWT for an authenticated user. Keep the payload minimal — never
 * include passwords or sensitive PII.
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

module.exports = generateToken;
