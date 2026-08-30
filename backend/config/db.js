const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(
      process.env.MONGO_URL,
      {
        autoIndex: true,
        serverSelectionTimeoutMS: 10000,
      }
    );

    console.log(
      `✅ MongoDB Connected : ${conn.connection.host}`
    );

  } catch (err) {
    console.error("❌ MongoDB Connection Failed");
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;