const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema(
  {
    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    servicesOffered: [
      {
        duration: {
          type: Number,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        charges: {
          type: Number,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Services = mongoose.model("Services", ServiceSchema);

module.exports = Services;
