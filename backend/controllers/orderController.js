const Order = require("../models/Order");
const Holding = require("../models/Holding");
const Fund = require("../models/Fund");
const Transaction = require("../models/Transaction");
const Position = require("../models/Position");

// ==================================================
// CREATE BUY / SELL ORDER
// ==================================================

exports.createOrder = async (req, res) => {
  try {
    const {
      name,
      qty,
      price,
      mode,
    } = req.body;

    // ==================================================
    // BASIC VALIDATION
    // ==================================================

    if (!name || !qty || !price || !mode) {
      return res.status(400).json({
        success: false,
        message: "All order fields are required",
      });
    }

    const quantity = Number(qty);
    const stockPrice = Number(price);

    // ==================================================
    // QUANTITY VALIDATION
    // ==================================================

    if (
      !Number.isInteger(quantity) ||
      quantity <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Quantity must be a whole number greater than 0",
      });
    }

    // ==================================================
    // PRICE VALIDATION
    // ==================================================

    if (
      !Number.isFinite(stockPrice) ||
      stockPrice <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    // ==================================================
    // MODE VALIDATION
    // ==================================================

    if (!["BUY", "SELL"].includes(mode)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order mode",
      });
    }

    const userId = req.user._id;

    const amount =
      quantity * stockPrice;

    // ==================================================
    // GET USER FUND
    // ==================================================

    let fund = await Fund.findOne({
      userId,
    });

    if (!fund) {
      fund = await Fund.create({
        userId,
        available: 100000,
        used: 0,
      });
    }

    // ==================================================
    // GET HOLDING
    // ==================================================

    let holding = await Holding.findOne({
      userId,
      name,
    });

    // ==================================================
    // SAVE ORIGINAL AVG PRICE
    // IMPORTANT FOR REALIZED P/L
    // ==================================================

    const originalAvgPrice = holding
      ? Number(holding.avg || 0)
      : 0;

    // ==================================================
    // BUY VALIDATION
    // ==================================================

    if (mode === "BUY") {
      if (
        Number(fund.available || 0) <
        amount
      ) {
        return res.status(400).json({
          success: false,
          message: "Insufficient Funds",
        });
      }
    }

    // ==================================================
    // SELL VALIDATION
    // ==================================================

    if (mode === "SELL") {
      if (!holding) {
        return res.status(400).json({
          success: false,
          message:
            "You do not own this stock",
        });
      }

      if (
        Number(holding.qty || 0) <
        quantity
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Insufficient stock quantity",
        });
      }
    }

    // ==================================================
    // CALCULATE REALIZED P/L
    // ==================================================

    let realizedPnL = 0;

    if (mode === "SELL") {
      realizedPnL =
        (stockPrice -
          originalAvgPrice) *
        quantity;
    }

    // ==================================================
    // BUY
    // ==================================================

    if (mode === "BUY") {

      // -------------------------------
      // UPDATE FUNDS
      // -------------------------------

      fund.available -= amount;
      fund.used += amount;

      await fund.save();

      // -------------------------------
      // UPDATE HOLDING
      // -------------------------------

      if (holding) {

        const oldInvestment =
          Number(holding.qty) *
          Number(holding.avg);

        const newInvestment =
          quantity * stockPrice;

        const totalQuantity =
          Number(holding.qty) +
          quantity;

        holding.avg =
          (oldInvestment +
            newInvestment) /
          totalQuantity;

        holding.qty =
          totalQuantity;

        holding.price =
          stockPrice;

        await holding.save();

      } else {

        holding =
          await Holding.create({
            userId,
            name,
            qty: quantity,
            avg: stockPrice,
            price: stockPrice,
            net: "0%",
            day: "0%",
          });
      }
    }

    // ==================================================
    // SELL
    // ==================================================

    if (mode === "SELL") {

      // =================================
      // INVESTMENT COST OF SOLD SHARES
      // =================================

      const releasedInvestment =
        originalAvgPrice *
        quantity;

      // =================================
      // ADD SELL PROCEEDS TO AVAILABLE
      // =================================

      fund.available += amount;

      // =================================
      // REMOVE SOLD SHARES' COST
      // FROM USED FUNDS
      // =================================

      fund.used -=
        releasedInvestment;

      if (fund.used < 0) {
        fund.used = 0;
      }

      // =================================
      // UPDATE HOLDING
      // =================================

      holding.qty -= quantity;

      holding.price =
        stockPrice;

      // =================================
      // COMPLETE SELL
      // =================================

      if (holding.qty <= 0) {

        await Holding.deleteOne({
          _id: holding._id,
          userId,
        });

        holding = null;

      } else {

        await holding.save();
      }

      // =================================
      // SAVE FUNDS
      // =================================

      await fund.save();
    }

    // ==================================================
    // CREATE ORDER
    // ==================================================

    const order =
      await Order.create({
        userId,
        name,
        qty: quantity,
        price: stockPrice,
        mode,
      });

    // ==================================================
    // CREATE TRANSACTION
    // ==================================================

    const transaction =
      await Transaction.create({
        userId,
        stock: name,
        type: mode,
        qty: quantity,
        price: stockPrice,
        amount,
        pnl: realizedPnL,
      });

    // ==================================================
    // GET POSITION
    // ==================================================

    let position =
      await Position.findOne({
        userId,
        name,
      });

    // ==================================================
    // BUY POSITION
    // ==================================================

    if (mode === "BUY") {

      if (position) {

        const oldInvestment =
          Number(position.qty) *
          Number(position.avg);

        const newInvestment =
          quantity * stockPrice;

        const totalQuantity =
          Number(position.qty) +
          quantity;

        position.avg =
          (oldInvestment +
            newInvestment) /
          totalQuantity;

        position.qty =
          totalQuantity;

        position.price =
          stockPrice;

        position.product =
          position.product ||
          "CNC";

        await position.save();

      } else {

        position =
          await Position.create({
            userId,
            product: "CNC",
            name,
            qty: quantity,
            avg: stockPrice,
            price: stockPrice,
            net: "0%",
            day: "0%",
          });
      }
    }

    // ==================================================
    // SELL POSITION
    // ==================================================

    if (mode === "SELL") {

      if (position) {

        position.qty -=
          quantity;

        position.price =
          stockPrice;

        if (position.qty <= 0) {

          await Position.deleteOne({
            _id: position._id,
            userId,
          });

          position = null;

        } else {

          await position.save();
        }
      }
    }

    // ==================================================
    // RESPONSE
    // ==================================================

    return res.status(201).json({
      success: true,

      message:
        `${mode} Order Placed Successfully`,

      order,

      transaction,

      fund,

      holding,

      position,

      realizedPnL,
    });

  } catch (err) {

    console.error(
      "CREATE ORDER ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==================================================
// GET USER ORDERS
// ==================================================

exports.getOrders = async (
  req,
  res
) => {
  try {

    const orders =
      await Order.find({
        userId: req.user._id,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json(
      orders
    );

  } catch (err) {

    console.error(
      "GET ORDERS ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};