const Tour = require('../models/tourModel');
const catchAsyncError = require('../utils/catchAsync');

exports.getOverview = catchAsyncError(async (req, res) => {
  // Getting the tour
  const tours = await Tour.find();

  // Building the template

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTours = catchAsyncError(async (req, res) => {
  // Get the requested tour
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviews rating user',
  });
  res.status(200).render('tour', {
    title: 'The Forest Hiker Tour',
    tour,
  });
});
