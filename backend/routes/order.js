const express = require("express");

const router =
  express.Router();

const orderController =
  require("../controllers/orderController");

const authMiddleware =
  require("../middleware/authMiddleware");

// =======================
// CREATE BUY / SELL ORDER
// =======================

router.post(
  "/",
  authMiddleware,
  orderController.createOrder
);

// =======================
// GET USER ORDERS
// =======================

router.get(
  "/",
  authMiddleware,
  orderController.getOrders
);

module.exports = router;