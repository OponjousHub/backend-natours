const Review = require('../models/reviewModel');
// const catchAsyncError = require('../utils/catchAsync');
const factory = require('./handleFactory');

exports.setTourUserId = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};
// Get All Reviews
exports.getAllReviews = factory.getAll(Review);
// Get one Review
exports.getReview = factory.getOne(Review);

// Create Review
exports.createReview = factory.createOne(Review);

// Deleting a review
exports.deleteReview = factory.deleteOne(Review);

// Updating a review
exports.updateReview = factory.updateOne(Review);
