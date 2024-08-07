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

const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);

userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

module.exports = userRouter;
