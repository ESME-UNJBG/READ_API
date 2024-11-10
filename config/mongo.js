const mongoose = require("mongoose");

const dbConnect = async () => {
  const DB_URI = process.env.DB_URI;
  try {
    await mongoose.connect(DB_URI);
    console.log("*** DB CONNECTED *****");
  } catch (error) {
    console.error("*** DB CONNECTION FAILED *****", error);
  }
};

module.exports = dbConnect;
