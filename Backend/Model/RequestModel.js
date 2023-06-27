const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  trainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trainer",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
});

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
