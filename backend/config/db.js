const mongoose = require("mongoose");

/**
 * Connects to MongoDB using MONGO_URI from environment variables.
 * Exits the process on connection failure so a process manager (pm2, docker, etc.)
 * can restart cleanly instead of running with a broken DB handle.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000,
    });

    console.log(`[db] MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`[db] MongoDB connection error: ${error.message}`);
    process.exit(1);
  }

  mongoose.connection.on("disconnected", () => {
    console.warn("[db] MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("[db] MongoDB reconnected");
  });
};

module.exports = connectDB;
