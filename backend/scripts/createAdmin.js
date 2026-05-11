/**
 * Creates (or promotes) an admin user.
 *
 *   npm run create:admin
 *
 * Reads optional overrides from env so it stays safe in CI / prod:
 *   ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD
 * Falls back to a development default if those are unset.
 */
require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("../config/db");
const User = require("../models/User");

const ADMIN_NAME = process.env.ADMIN_NAME || "Orange Admin";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "admin@orange.local").toLowerCase();
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Admin@12345";

(async () => {
  try {
    await connectDB();

    let user = await User.findOne({ email: ADMIN_EMAIL }).select("+password");

    if (user) {
      user.name = ADMIN_NAME;
      user.role = "admin";
      user.password = ADMIN_PASSWORD;
      await user.save();
      console.log(`[admin] Updated existing user -> ${ADMIN_EMAIL} (role=admin)`);
    } else {
      user = await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: "admin",
      });
      console.log(`[admin] Created admin user -> ${ADMIN_EMAIL}`);
    }

    console.log("[admin] Sign in with:");
    console.log(`         Email:    ${ADMIN_EMAIL}`);
    console.log(`         Password: ${ADMIN_PASSWORD}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error("[admin] Failed:", err);
    process.exit(1);
  }
})();
