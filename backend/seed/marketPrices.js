require("dotenv").config();

const mongoose = require("mongoose");
const MarketPrice = require("../models/MarketPrice");

const stocks = [
  {
    name: "RELIANCE",
    price: 1450,
    day: "+1.25%",
  },
  {
    name: "TCS",
    price: 3800,
    day: "+0.85%",
  },
  {
    name: "INFY",
    price: 1750,
    day: "-0.45%",
  },
  {
    name: "HDFCBANK",
    price: 1950,
    day: "+0.65%",
  },
  {
    name: "ICICIBANK",
    price: 1350,
    day: "+0.72%",
  },
  {
    name: "SBIN",
    price: 850,
    day: "-0.30%",
  },
  {
    name: "WIPRO",
    price: 520,
    day: "+0.40%",
  },
  {
    name: "ITC",
    price: 470,
    day: "+0.55%",
  },
];

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    for (const stock of stocks) {
      await MarketPrice.findOneAndUpdate(
        { name: stock.name },
        stock,
        {
          upsert: true,
          new: true,
        }
      );
    }

    console.log(
      "✅ Market Prices Seeded Successfully"
    );

    await mongoose.connection.close();
  })
  .catch((err) => {
    console.error(
      "❌ Market Price Seed Error:",
      err
    );
  });