const { check, validationResult } = require('express-validator');
const {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");
const Review = require("../models/reviewModel");
const express = require("express");

const router = express.Router();

// Validation middleware for creating a review
const validateCreateReview = [
  check('title').notEmpty().withMessage('Review title is required'),
  check('content').notEmpty().withMessage('Review content is required'),
  check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  check('productId').isMongoId().withMessage('Invalid product ID'),
  check('userId').isMongoId().withMessage('Invalid user ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Validation middleware for updating a review
const validateUpdateReview = [
  check('title').optional().notEmpty().withMessage('Review title cannot be empty'),
  check('content').optional().notEmpty().withMessage('Review content cannot be empty'),
  check('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Create a new review
router.post('/reviews', validateCreateReview, createReview);

// Get all reviews
router.get('/reviews', getAllReviews);

// Get reviews by product
router.get('/reviews/product/:productId', getReviewById);

// Update a review
router.put('/reviews/:reviewId', validateUpdateReview, updateReview);

// Delete a review
router.delete('/reviews/:reviewId', deleteReview);

module.exports = router;
