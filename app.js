const fs = require('fs');
const express = require('express');
const tourRouter = require('./route/tourRoutes');
const userRouter = require('./route/userRoutes');
const reviewRouter = require('./route/reviewRoutes');
const bookingRouter = require('./route/bookingRoute');
const bookingController = require('./controllers/bookingController');
const viewRouter = require('./route/viewRoutes');
const AppError = require('./utils/appError');
const globalerrorHandler = require('./controllers/errorController');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const path = require('path');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');

const app = express();

app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
///////////////// MIDDLEWARES ///////////////////

// Implimenting cors
app.use(cors());

// Access-Control-Allow-Origin

// If we have our API in one domain and wants to access it from another domain,say natours.com
// app.use(cors({
//   origin: 'https://www.natours.com'
// }))

// Below is for non simple requests that are not get and post
app.options('*', cors());
// if we want to implement it on only one route
// app.use('/api/vi/tours/:id', cors())

//Serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Security middleware
app.use(helmet());

// Limit requests from same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

app.post(
  '/webhook-checkout',
  express.raw({ type: 'application/json' }),
  bookingController.webhookCheckout
);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data snitization against XSS
app.use(xss());

// Prevent against parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'price',
      'maxGroupSiz',
      'ratingsAverage',
      'difficulty',
    ],
  })
);

app.use(compression());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl} on the server!`, 400));
});

app.use(globalerrorHandler);

///////////////// STARTING SeRVER///////////////////

module.exports = app;
