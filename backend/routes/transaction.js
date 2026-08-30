const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middleware/authMiddleware");

// Get logged-in user's transactions
router.get(
  "/",
  authMiddleware,
  transactionController.getTransactions
);

module.exports = router;