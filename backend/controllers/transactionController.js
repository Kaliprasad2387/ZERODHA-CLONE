const Transaction = require("../models/Transaction");

// =======================
// GET USER TRANSACTIONS
// =======================

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(transactions);

  } catch (err) {
    console.error("GET TRANSACTIONS ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};