const Position = require("../models/Position");
const Holding = require("../models/Holding");

// =======================
// GET USER POSITIONS
// =======================

exports.getPositions = async (
  req,
  res
) => {
  try {

    const userId =
      req.user._id;

    // ==========================================
    // GET ALL USER HOLDINGS
    // ==========================================

    const holdings =
      await Holding.find({
        userId,
      });

    // ==========================================
    // CREATE MISSING POSITIONS
    // ==========================================

    for (const holding of holdings) {

      const existingPosition =
        await Position.findOne({
          userId,
          name: holding.name,
        });

      if (existingPosition) {
        continue;
      }

      await Position.create({
        userId,
        product: "CNC",
        name: holding.name,
        qty:
          Number(holding.qty) || 0,
        avg:
          Number(holding.avg) || 0,
        price:
          Number(holding.price) || 0,
        net:
          holding.net || "0%",
        day:
          holding.day || "0%",
      });
    }

    // ==========================================
    // GET POSITIONS
    // ==========================================

    const positions =
      await Position.find({
        userId,
      }).sort({
        createdAt: -1,
      });

    return res.status(200).json(
      positions
    );

  } catch (err) {

    console.error(
      "GET POSITIONS ERROR:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};