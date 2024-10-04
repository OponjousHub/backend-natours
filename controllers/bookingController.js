const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Tour = require('./../models/tourModel');
const AppError = require('./../utils/appError');
const catchAsyncError = require('./../utils/catchAsync');
const factory = require('./handleFactory');

exports.getCheckoutSession = catchAsyncError(async (req, res, next) => {
  // 1) get the currently booked tour
  const tour = await Tour.findById(req.params.tourID);
  console.log(tour, 'this is it');

  //2) create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            images: [`	http://www.natours.dev/img/tours/${tour.imageCover}`],
            description: tour.summary,
          },
          unit_amount: tour.price * 100,
        },
        quantity: 1,
      },
    ],
    mode: 'payment',
  });

  // const transformedItems = [
  //   {
  //     quantity: 1,
  //     price_data: {
  //       currency: 'usd',
  //       product_data: {
  //         name: `${tour.name} Tour`,
  //         description: tour.summary,
  //         images: [` http://localhost:3000/img/tours/${tour.imageCover}`],
  //       },
  //       unit_amount: tour.price * 100,
  //     },
  //   },
  // ];

  // const session = await stripe.checkout.sessions.create({
  //   payment_method_types: ['card'],
  //   success_url: `${req.protocol}://${req.get('host')}/`,
  //   cancel_url: `${req.protocol}://${req.get('host')}/tours`,
  //   customer_email: req.user.email,
  //   client_reference_id: req.params.tourId,

  //   line_items: transformedItems,

  //   mode: 'payment',
  // });

  // 3) Create sesion as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

// const transformedItems = [
//   {
//     quantity: 1,
//     price_data: {
//       currency: 'usd',
//       unit_amount: tour.price * 100,
//       product_data: {
//         name: `${tour.name} Tour`,
//         description: tour.summary,
//         images: [` http://localhost:3000/img/tours/${tour.imageCover}`],
//       },
//     },
//   },
// ];

// const session = await stripe.checkout.sessions.create({
//   payment_method_types: ['card'],
//   success_url: `${req.protocol}://${req.get('host')}/`,
//   cancel_url: `${req.protocol}://${req.get('host')}/tours`,
//   customer_email: req.user.email,
//   client_reference_id: req.params.tourId,

//   line_items: transformedItems,

//   mode: 'payment',
// });
