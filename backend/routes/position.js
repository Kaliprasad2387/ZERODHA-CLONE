const express = require("express");
const router = express.Router();

const positionController = require("../controllers/positionController");
const authMiddleware = require("../middleware/authMiddleware");

// Get logged-in user's positions
router.get(
  "/",
  authMiddleware,
  positionController.getPositions
);

module.exports = router;