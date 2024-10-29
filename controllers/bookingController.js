const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/bookingModel');
const Tour = require('./../models/tourModel');
const AppError = require('./../utils/appError');
const catchAsyncError = require('./../utils/catchAsync');
const factory = require('./handleFactory');

exports.getCheckoutSession = catchAsyncError(async (req, res, next) => {
  // 1) get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  // console.log(tour, 'this is it');

  //2) create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${
      req.params.tourId
    }&user=${req.user}&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            images: [`http://www.natours.dev/img/tours/${tour.imageCover}`],
            description: tour.summary,
          },
          unit_amount: tour.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  // 3) Create sesion as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.createBookingCheckout = catchAsyncError(async (req, res, next) => {
  // This is temporally because everyone can make a booking without paaying
  const { tour, user, price } = req.query;

  if (!tour && !user && !price) return;

  const booking = await Booking.create({ tour, user, price });

  res.status(200).json({
    status: 'success',
    data: booking,
  });

  res.redirect(req.originalUrl.split('?')[0]);
});
