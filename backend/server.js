require("dotenv").config();

const express = require("express");
const morgan = require("morgan");

const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const platformRoutes = require("./routes/platformRoutes");
const apiServiceRoutes = require("./routes/apiServiceRoutes");
const gameRoutes = require("./routes/gameRoutes");

connectDB();

const app = express();

/**
 * Permissive CORS — allow any origin, any method, any header.
 * No env config needed.
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    req.headers["access-control-request-headers"] || "*"
  );
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/platforms", platformRoutes);
app.use("/api/api-services", apiServiceRoutes);
app.use("/api/games", gameRoutes);

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/platforms", platformRoutes);
app.use("/api-services", apiServiceRoutes);
app.use("/games", gameRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(
    `[server] ${process.env.NODE_ENV || "development"} server running on http://localhost:${PORT}`
  );
});

process.on("unhandledRejection", (err) => {
  console.error(`[server] Unhandled rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

process.on("uncaughtException", (err) => {
  console.error(`[server] Uncaught exception: ${err.message}`);
  server.close(() => process.exit(1));
});

module.exports = app;
