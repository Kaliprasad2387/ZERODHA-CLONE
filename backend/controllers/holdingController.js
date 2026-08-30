const Holding = require("../models/Holding");

// =======================
// GET USER HOLDINGS
// =======================

exports.getHoldings = async (req, res) => {
  try {
    const holdings = await Holding.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    return res.status(200).json(
      holdings
    );

  } catch (err) {
    console.error(
      "GET HOLDINGS ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// UPDATE HOLDING PRICE
// =======================

exports.updateHoldingPrice = async (
  req,
  res
) => {
  try {
    const { name, price } =
      req.body;

    const newPrice =
      Number(price);

    // =======================
    // VALIDATION
    // =======================

    if (
      !name ||
      !Number.isFinite(newPrice) ||
      newPrice <= 0
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Valid stock name and price are required",
      });
    }

    // =======================
    // NORMALIZE STOCK NAME
    // =======================

    const stockName =
      name.toUpperCase().trim();

    // =======================
    // UPDATE PRICE
    // =======================

    const holding =
      await Holding.findOneAndUpdate(
        {
          userId: req.user._id,
          name: stockName,
        },
        {
          $set: {
            price: newPrice,
          },
        },
        {
          new: true,
        }
      );

    // =======================
    // HOLDING NOT FOUND
    // =======================

    if (!holding) {
      return res.status(404).json({
        success: false,
        message:
          "Holding not found",
      });
    }

    // =======================
    // SUCCESS
    // =======================

    return res.status(200).json({
      success: true,
      message:
        "Holding price updated",
      holding,
    });

  } catch (err) {
    console.error(
      "UPDATE HOLDING PRICE ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};