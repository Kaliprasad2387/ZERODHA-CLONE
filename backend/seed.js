require("dotenv").config();

const mongoose = require("mongoose");

const Holding = require("./models/Holding");
const Position = require("./models/Position");

const { holdings, positions } = require("./data");

mongoose
  .connect(process.env.MONGO_URL)
  .then(async () => {
    console.log("✅ MongoDB Connected");

    await Holding.deleteMany({});
    await Position.deleteMany({});

    await Holding.insertMany(holdings);
    await Position.insertMany(positions);

    console.log("✅ Data Seeded Successfully");

    mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });