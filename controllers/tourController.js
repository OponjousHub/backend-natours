const fs = require('fs');
const Tour = require('./../models/tourModel');
const APIfeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const { json } = require('express');
const { match } = require('assert');
const catchAsyncError = require('./../utils/catchAsync');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'ratingsAverage,price';
  req.query.fields = 'name,duration,ratingsAverage,price,difficulty,summary';
  next();
};

exports.getTourStatistics = async (req, res, next) => {
  try {
    const stats = await Tour.aggregate([
      { $match: { ratingsAverage: { $gte: 4.5 } } },
      {
        $group: {
          _id: '$difficulty',
          numTours: { $sum: 1 },
          numRatings: { $sum: '$ratingsQuantity' },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' },
        },
      },
      { $sort: { avgPrice: -1 } },
      // { $match: { _id: { $ne: 'easy' } } },
    ]);
    res.status(200).json({
      status: 'success',
      data: stats,
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.getMonthlyPlan = catchAsyncError(async (req, res, next) => {
  const year = req.params.year * 1;
  const plan = await Tour.aggregate([
    { $unwind: '$startDates' },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-10`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numTourStart: { $sum: 1 },
        tours: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    { $sort: { numTourStart: -1 } },
    {
      $limit: 12,
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: plan,
  });
});

exports.getAllTours = catchAsyncError(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIfeatures(Tour.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours: tours },
  });
});

exports.createTour = catchAsyncError(async (req, res, next) => {
  const newTour = await Tour.create(req.body);

  res.status(201).json({
    status: 'success',
    date: { tour: newTour },
  });
});

exports.getTour = async (req, res, next) => {
  try {
    const tour = await Tour.findById(req.params.id);

    if (!tour) {
      return next(new AppError('No tour found with that ID', 404));
    }

    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'Failed',
      message: 'Could not fetch the selected tour!',
    });
  }
};

exports.updateTour = catchAsyncError(async (req, res, next) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(201).json({
    status: 'success',
    data: {
      updatedTour,
    },
  });
});
exports.deleteTour = catchAsyncError(async (req, res, next) => {
  const tour = await Tour.findByIdAndDelete(req.params.id, req.body);

  if (!tour) {
    return next(new AppError('No tour found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: 'Tour was successfully deleted!',
  });
});
