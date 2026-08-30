const marketPriceRoutes =
  require("./routes/marketPrice");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const holdingRoutes = require("./routes/holding");
const positionRoutes = require("./routes/position");
const orderRoutes = require("./routes/order");
const authRoutes = require("./routes/auth");
const otpRoutes = require("./routes/otp");
const passwordRoutes = require("./routes/password");
const fundRoutes = require("./routes/fund");
const transactionRoutes = require("./routes/transaction");
const profileRoutes = require("./routes/profile");

const app = express();

// ================= DATABASE =================
connectDB();

// ================= MIDDLEWARE =================
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= API ROUTES =================
app.use("/auth", authRoutes);
app.use("/otp", otpRoutes);
app.use("/password", passwordRoutes);
app.use("/profile", profileRoutes);

app.use("/holdings", holdingRoutes);
app.use("/positions", positionRoutes);
app.use("/orders", orderRoutes);
app.use("/funds", fundRoutes);
app.use("/transactions", transactionRoutes);
app.use(
  "/market-prices",
  marketPriceRoutes
);

// ================= HOME =================
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    app: "Zerodha Clone API",
    version: "1.0.0",
    message: "🚀 Backend Running Successfully",
  });
});

// ================= HEALTH CHECK =================
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    database:
      require("mongoose").connection.readyState === 1
        ? "Connected"
        : "Disconnected",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// ================= 404 =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`🚀 Server Running : http://localhost:${PORT}`);
});