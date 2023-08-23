// (createReview, getAllReviews, getSingleReview, updateReview, deleteReview)

const Review = require("../models/Review");
const Product = require("../models/Product");
const checkPermissions = require("../utils/checkPermissions");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  isValidProduct = await Product.findOne({ _id: productId });
  if (!isValidProduct) {
    return res
      .status(400)
      .json({ message: `No product with that id : ${productId}` });
  }
  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user.userId,
  });
  if (alreadyReviewed) {
    return res
      .status(400)
      .json({ message: "Already submitted review for this product" });
  }

  req.body.user = req.user.userId;
  const review = await Review.create(req.body);
  res.status(201).json(review);
};
const getAllReviews = async (req, res) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
};
const getSingleReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  res.status(200).json({ review });
};
const updateReview = async (req, res) => {
  const { rating, comment, title } = req.body;
  const { reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    return res
      .status(404)
      .json({ message: `No product with that id : ${reviewId}` });
  }
  checkPermissions(req.user, review.user);
  review.title = title;
  review.comment = comment;
  review.rating = rating;
  await review.save();
  res.status(200).json({ review, message: "review Updated" });
};
const deleteReview = async (req, res) => {
  const { reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) {
    return res
      .status(404)
      .json({ message: `No product with that id : ${reviewId}` });
  }
  checkPermissions(req.user, review.user);
  await review.deleteOne();
  res.status(200).json({ message: "review deleted" });
};

module.exports = {
  getAllReviews,
  createReview,
  getSingleReview,
  updateReview,
  deleteReview,
};
