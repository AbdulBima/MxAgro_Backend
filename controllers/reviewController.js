const Review = require("../models/reviewModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");



//create a review

const createReview = asyncHandler( async (req, res) => {
  try {
    const { productId, buyerId, rating, comment } = req.body;

    // Validate product and user existence
    const product = await Product.findById(productId);
    //find user to generate name
    const user = await User.findById(userId);

    if (!product || !user) {
      return res.status(404).json({ message: 'Product or User not found' });
    }

    // Create the review
    const newReview = new Review({
      product: productId,
      user: userId,
      rating,
      comment
    });

    await newReview.save();

    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//get all reviewsw
const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find().populate('product').populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get event by id

const getReviewById = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate('user');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a review

const updateReview = asyncHandler(async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Update the review fields
    review.rating = rating;
    review.comment = comment;
    review.updatedAt = Date.now();

    await review.save();

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


//delete a review

const deleteReview = asyncHandler(async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




module.exports = {

  createReview,
	getAllReviews,
	getReviewById,
	updateReview,
	deleteReview,
	// deleteProduct,
};
