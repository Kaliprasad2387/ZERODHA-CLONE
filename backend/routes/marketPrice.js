const express = require("express");

const router = express.Router();

const marketPriceController =
  require("../controllers/marketPriceController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.get(
  "/",
  authMiddleware,
  marketPriceController.getMarketPrices
);

router.put(
  "/",
  authMiddleware,
  marketPriceController.updateMarketPrice
);

module.exports = router;