const Review = require('../models/reviewModel');
const catchAsyncError = require('../utils/catchAsync');

exports.getAllReviews = catchAsyncError(async (req, res) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.createReview = catchAsyncError(async (req, res) => {
  const newReview = await Review.create(req.body);
  console.log(newReview);

  res.status(201).json({
    status: 'success',
    data: { review: newReview },
  });
});
