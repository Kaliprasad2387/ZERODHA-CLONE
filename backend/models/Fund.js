const mongoose = require("mongoose");

const fundSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    available: {
      type: Number,
      default: 100000,
      min: 0,
    },

    used: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Fund", fundSchema);