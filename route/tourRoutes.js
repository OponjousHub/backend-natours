// const fs = require('fs');
const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('./../controllers/authController');

const tourRouter = express.Router();

// tourRouter.param('id', tourController.checkId);

tourRouter.route('/tour-stats').get(tourController.getTourStatistics);
tourRouter.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

tourRouter
  .route('/5-best-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
tourRouter
  .route('/:id')
  .patch(tourController.updateTour)
  .get(tourController.getTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

module.exports = tourRouter;
