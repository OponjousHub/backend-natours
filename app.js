const fs = require('fs');
const express = require('express');
const tourRouter = require('./route/tourRoutes');
const userRouter = require('./route/userRoutes');
const AppError = require('./utils/appError');
const globalerrorHandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');

///////////////// MIDDLEWARES ///////////////////

const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.use(express.json());

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} on the server!`));
});

app.use(globalerrorHandler);

///////////////// STARTING SeRVER///////////////////

module.exports = app;
