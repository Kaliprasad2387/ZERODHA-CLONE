const MarketPrice = require("../models/MarketPrice");
const Holding = require("../models/Holding");
const Position = require("../models/Position");

// =======================
// GET MARKET PRICES
// =======================

exports.getMarketPrices = async (req, res) => {
  try {
    const prices = await MarketPrice.find().sort({
      name: 1,
    });

    // Sync current market prices
    // with user's holdings and positions
    for (const stock of prices) {
      await Holding.updateMany(
        {
          userId: req.user._id,
          name: stock.name,
        },
        {
          $set: {
            price: stock.price,
            day: stock.day || "0%",
          },
        }
      );

      await Position.updateMany(
        {
          userId: req.user._id,
          name: stock.name,
        },
        {
          $set: {
            price: stock.price,
            day: stock.day || "0%",
          },
        }
      );
    }

    res.status(200).json(prices);

  } catch (err) {
    console.error(
      "GET MARKET PRICES ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// UPDATE MARKET PRICE
// =======================

exports.updateMarketPrice = async (
  req,
  res
) => {
  try {
    const { name, price, day } = req.body;

    const newPrice = Number(price);

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
} {
      return res.status(400).json({
        success: false,
        message:
          "Valid stock name and price are required",
      });
    }

    const stockName =
      name.toUpperCase();

    const marketPrice =
      await MarketPrice.findOneAndUpdate(
        {
          name: stockName,
        },
        {
          name: stockName,
          price: newPrice,
          day: day || "0%",
        },
        {
          new: true,
          upsert: true,
        }
      );

    // =======================
    // UPDATE HOLDINGS
    // =======================

    await Holding.updateMany(
      {
        userId: req.user._id,
        name: stockName,
      },
      {
        $set: {
          price: newPrice,
          day: day || "0%",
        },
      }
    );

    // =======================
    // UPDATE POSITIONS
    // =======================

    await Position.updateMany(
      {
        userId: req.user._id,
        name: stockName,
      },
      {
        $set: {
          price: newPrice,
          day: day || "0%",
        },
      }
    );

    res.status(200).json({
      success: true,
      message:
        "Market Price Updated Successfully",

      marketPrice,
    });

  } catch (err) {
    console.error(
      "UPDATE MARKET PRICE ERROR:",
      err
    );

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};