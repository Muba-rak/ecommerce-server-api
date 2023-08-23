const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "provide a rating"],
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: [true, "provide review title"],
      trim: true,
      maxLength: 100,
    },
    comment: {
      type: String,
      required: [true, "provide reviiew comment"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
reviewSchema.index({ product: 1 }, { user: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
