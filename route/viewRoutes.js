const express = require('express');
const viewControllers = require('../controllers/viewControllers');

const router = express.Router();

router.get('/', viewControllers.getOverview);
router.get('/tour', viewControllers.getTours);

module.exports = router;
