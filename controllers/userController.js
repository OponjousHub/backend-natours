const catchAsyncError = require('./../utils/catchAsync');
const Users = require('./../models/userModel');
const AppError = require('./../utils/appError');
const User = require('./../models/userModel');
const factory = require('./handleFactory');

exports.deleteMe = catchAsyncError(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getme = (req, res, next) => {
  req.params.id = req.user.id;

  next();
};

const filterObj = (obj, ...allawedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allawedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsyncError(async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted names that are nir allowed that be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user Data
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

// Getting all users
exports.getAllUsers = factory.getAll(User);
// catchAsyncError(async (req, res, next) => {
//   const users = await Users.find();

//   res.status(200).json({
//     status: 'success',
//     results: users.length,
//     data: users,
//   });
// });
// Get User
exports.getUser = factory.getOne(User);

// Create User
exports.createUser = factory.createOne(User);

// Delete User
exports.deleteUser = factory.deleteOne(User);

// Update User
exports.updateUser = factory.updateOne(User);
