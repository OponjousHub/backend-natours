const fs = require('fs');
const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
} = require('./../controllers/userController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
