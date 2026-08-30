const express = require("express");

const router = express.Router();

const holdingController =
  require("../controllers/holdingController");

const authMiddleware =
  require("../middleware/authMiddleware");

// Get holdings
router.get(
  "/",
  authMiddleware,
  holdingController.getHoldings
);

// Update holding market price
router.put(
  "/price",
  authMiddleware,
  holdingController.updateHoldingPrice
);

module.exports = router;