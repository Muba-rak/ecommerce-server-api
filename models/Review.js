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

reviewSchema.statics.calcAvg = async function (productId) {
  const result = await this.aggregate([
    {
      $match: {
        product: productId,
      },
    },
    {
      $group: {
        _id: null,
        averageRating: {
          $avg: "$rating",
        },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.log(error);
  }
};
reviewSchema.post("save", async function () {
  await this.constructor.calcAvg(this.product);
});
reviewSchema.post("deleteOne", { document: true }, async function () {
  await this.constructor.calcAvg(this.product);
});

module.exports = mongoose.model("Review", reviewSchema);
