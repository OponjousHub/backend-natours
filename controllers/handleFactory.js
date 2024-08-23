const catchAsyncError = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = (model) =>
  catchAsyncError(async (req, res, next) => {
    const doc = await model.findByIdAndDelete(req.params.id, req.body);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
