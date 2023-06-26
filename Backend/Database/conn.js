const mongoose = require("mongoose");
const AppError = require("../Error-Handling/error");

const connectDB = (req, res) => {
  try {
    mongoose.connect(
      "mongodb+srv://sandy:sandy@cluster0.wgjlw2n.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("DB connected");
  } catch (error) {
    return next(new AppError("Db Not connected"));
  }
};
module.exports = { connectDB };
