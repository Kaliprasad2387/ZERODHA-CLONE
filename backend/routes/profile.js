const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/authMiddleware");

// Get my profile
router.get(
  "/",
  authMiddleware,
  profileController.getProfile
);

// Update my profile
router.put(
  "/",
  authMiddleware,
  profileController.updateProfile
);

module.exports = router;