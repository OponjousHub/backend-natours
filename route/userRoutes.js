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
const userController = require('./../controllers/userController');
const multer = require('multer');

const upload = multer({ dest: 'public/img/users' });
const userRouter = express.Router();

userRouter.post('/signup', authController.signup);
userRouter.post('/login', authController.login);
userRouter.get('/logout', authController.logout);
userRouter.post('/forgotPassword', authController.forgotPassword);
userRouter.patch('/resetPassword/:token', authController.resetPassword);

// Protects all routes after this middleware
userRouter.use(authController.protect);

userRouter.get('/me', userController.getme, userController.getUser);
userRouter.patch(
  '/updateMe',
  userController.uploadPUserhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);
userRouter.delete('/deleteMe', userController.deleteMe);
userRouter.patch('/updateMyPassword', authController.updatePassword);

// Protects all routes after this middleware
userRouter.use(authController.protect);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);
module.exports = userRouter;
