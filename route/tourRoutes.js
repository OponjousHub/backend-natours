// const fs = require('fs');
const express = require('express');
const tourController = require('../controllers/tourController');

const tourRouter = express.Router();

// tourRouter.param('id', tourController.checkId);

tourRouter
  .route('/5-best-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
tourRouter
  .route('/:id')
  .patch(tourController.updateTour)
  .get(tourController.getTour)
  .delete(tourController.deleteTour);

module.exports = tourRouter;
