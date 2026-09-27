// Entry point for the ALLEN 2040 Student OS backend (hackathon MVP).
// Sets up Express, middleware, and mounts all route groups under /api.

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// --- Core middleware ---
app.use(cors());
app.use(express.json());

// --- Routes ---
app.use("/api/health", healthRoutes);
app.use("/api/student", studentRoutes);

// --- Fallback for unknown routes ---
app.use((req, res) => {
  res.status(404).json({
    status: "error",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

app.listen(PORT, () => {
  console.log(`ALLEN 2040 backend running on http://localhost:${PORT}`);
});
