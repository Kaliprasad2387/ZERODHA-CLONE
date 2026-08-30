const express = require("express");
const router = express.Router();

const auth = require("../controllers/authController");

// Auth
router.post("/register", auth.register);
router.post("/login", auth.login);

// Health Check
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Auth API Working 🚀",
  });
});

module.exports = router;