const mongoose = require("mongoose");

const boughtSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    boughtBy: {
      type: String,
      enum: ["alaa", "mohamed"],
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Bought", boughtSchema);
