const Tour = require('../models/tourModel');
const catchAsyncError = require('../utils/catchAsync');

exports.getOverview = catchAsyncError(async (req, res, next) => {
  // Getting the tour
  const tours = await Tour.find();

  // Building the template

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTours = catchAsyncError(async (req, res, next) => {
  // Get the requested tour
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    fields: 'reviews rating user',
  });
  res.status(200).render('tour', {
    title: `${tour.name} Tour`,
    tour,
  });
});

exports.getLoginForm = (req, res, next) => {
  res.status(200).render('login', {
    title: 'Login to your account',
  });
};
