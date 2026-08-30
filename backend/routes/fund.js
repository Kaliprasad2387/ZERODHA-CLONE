const express = require("express");
const router = express.Router();

const fundController = require("../controllers/fundController");
const authMiddleware = require("../middleware/authMiddleware");

router.get(
  "/",
  authMiddleware,
  fundController.getFunds
);

router.post(
  "/add",
  authMiddleware,
  fundController.addFunds
);

router.post(
  "/withdraw",
  authMiddleware,
  fundController.withdrawFunds
);

module.exports = router;