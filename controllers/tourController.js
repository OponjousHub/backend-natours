const fs = require('fs');
const Tour = require('./../models/tourModel');
const { json } = require('express');
const { match } = require('assert');
// exports.checkId =
//   ('id',
//   (req, res, next, val) => {
//     const id = req.params.id * 1;
//     // const tour = tours.find((el) => el.id === id);

//     if (id > tours.length) {
//       return res.status(404).json({
//         status: 'fail',
//         data: 'INvalid request',
//       });
//     }
//     next();
//   });

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

exports.getAllTours = async (req, res) => {
  try {
    // BUILD QUERY
    // 1A) FILTERONG
    const queryObj = { ...req.query };
    const excludedfields = ['page', 'sort', 'limit', 'fields'];
    excludedfields.forEach((el) => delete queryObj[el]);
    console.log(req.query);
    console.log(queryObj);

    // 1B) ADVANCE FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    // const query = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .where('difficulty')
    //   .equals('easy');

    // 2) SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }
    // Field Limiting
    if (req.query.fields) {
      const field = req.query.fields.split(',').join(' ');
      query = query.select(field);
    } else {
      query = query.select('-__v');
    }

    //EXECUTE QUERY
    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours: tours },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      date: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      data: {
        message: err,
      },
    });
  }
  // console.log(req.body);
  // res.send('Done');
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(200).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

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
exports.updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: 'success',
      data: {
        updatedTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
  //   const id = req.params.id * 1;
  //   const tour = tours.find((el) => el.id === id);
  //   res.status(200).json({
  //     status: 'success',
  //     data: {
  //       tour: '<Updated Tour here...',
  //     },
  //   });
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id, req.body);

    res.status(204).json({
      status: 'success',
      data: 'Tour was successfully deleted!',
    });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: 'Could not delete the selected tour!',
    });
  }
};
