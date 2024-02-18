const mongoose = require("mongoose");
const DB_URL = process.env.DB_URL;

const initializeDb = async () => {
  try {
    await mongoose.connect(DB_URL, {
      dbName: "paytm",
    });
    console.log("connected to DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { initializeDb };
