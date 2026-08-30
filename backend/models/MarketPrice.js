const mongoose = require("mongoose");

const marketPriceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    day: {
      type: String,
      default: "0%",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "MarketPrice",
  marketPriceSchema
);