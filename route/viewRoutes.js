const express = require('express');
const viewControllers = require('../controllers/viewControllers');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get('/me', authController.protect, viewControllers.getAccount);
router.get('/my-tours', authController.protect, bookingController.getMyTours);
router.post(
  '/submit_user_data',
  authController.protect,
  viewControllers.updateUserData
);

router.use(authController.isLoggedIn);

router.get(
  '/',
  // bookingController.createBookingCheckout,
  viewControllers.getOverview
);
router.get('/tour/:slug', viewControllers.getTours);
router.get('/login', viewControllers.getLoginForm);

module.exports = router;
