const express = require('express');
const viewControllers = require('../controllers/viewControllers');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', viewControllers.getOverview);
router.get('/tour/:slug', authController.protect, viewControllers.getTours);
router.get('/login', viewControllers.getLoginForm);

module.exports = router;
