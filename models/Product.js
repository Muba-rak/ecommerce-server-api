const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide product name"],
      maxlength: [100, "Max product name is 100"],
    },
    price: {
      type: Number,
      default: 0,
      required: [true, "Please provide product price"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please provide product description"],
      maxlength: [1000, "Max product description is 1000"],
    },
    image: {
      type: String,
      default:
        "https://png.pngtree.com/png-clipart/20200311/ourmid/pngtree-empty-frame-with-torn-paper-png-image_2157793.jpg",
    },

    category: {
      type: String,
      required: [true, "Please provide product category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      required: [true, "Please provide product company"],
      enum: ["ikea", "marcos", "liddy"],
    },
    colors: {
      type: [String],
      required: true,
      default: ["#222"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      default: 10,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

productSchema.pre("deleteOne", async function (next) {
  console.log("im here");
  this.model("Review").deleteMany({ product: this._id });
  next();
});
module.exports = mongoose.model("Product", productSchema);
