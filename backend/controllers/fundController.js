const Fund = require("../models/Fund");

// =======================
// GET FUNDS
// =======================

exports.getFunds = async (req, res) => {
  try {
    let fund = await Fund.findOne({
      userId: req.user._id,
    });

    // Create default fund account
    // if user does not have one
    if (!fund) {
      fund = await Fund.create({
        userId: req.user._id,
        available: 100000,
        used: 0,
      });
    }

    res.status(200).json(fund);

  } catch (err) {
    console.error(
      "GET FUNDS ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// ADD FUNDS
// =======================

exports.addFunds = async (req, res) => {
  try {
    const amount =
      Number(req.body.amount);

    // Validate amount
    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid amount",
      });
    }

    let fund = await Fund.findOne({
      userId: req.user._id,
    });

    // Create fund if missing
    if (!fund) {
      fund = await Fund.create({
        userId: req.user._id,
        available: 100000,
        used: 0,
      });
    }

    // Add only to available balance
    fund.available += amount;

    await fund.save();

    res.status(200).json({
      success: true,
      message:
        "Funds Added Successfully",
      fund,
    });

  } catch (err) {
    console.error(
      "ADD FUNDS ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// WITHDRAW FUNDS
// =======================

exports.withdrawFunds = async (
  req,
  res
) => {
  try {
    const amount =
      Number(req.body.amount);

    // Validate amount
    if (
      !Number.isFinite(amount) ||
      amount <= 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Enter a valid amount",
      });
    }

    const fund = await Fund.findOne({
      userId: req.user._id,
    });

    if (!fund) {
      return res.status(404).json({
        success: false,
        message:
          "Fund account not found",
      });
    }

    // Cannot withdraw used money
    if (amount > fund.available) {
      return res.status(400).json({
        success: false,
        message:
          "Insufficient Available Balance",
      });
    }

    // Withdraw only from available
    fund.available -= amount;

    await fund.save();

    res.status(200).json({
      success: true,
      message:
        "Funds Withdrawn Successfully",
      fund,
    });

  } catch (err) {
    console.error(
      "WITHDRAW FUNDS ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};