const fs = require('fs');
const mongoose = require('mongoose');
// const app = require('./app');
// const detenv = require('dotenv');
const Tour = require('./../../models/tourModel');
const User = require('./../../models/userModel');
const Review = require('./../../models/reviewModel');
// const port = 3000;

// dotenv.config({ path: './config.env' });

const DB =
  'mongodb+srv://josephikegwu:SXT2hDodGoY7hnV0@cluster0.jwuyhe7.mongodb.net/natures?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB).then(() => console.log('DB connections successful'));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
);

// IMPORT DATS INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Tours added successfull.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const delAllTours = async () => {
  try {
    await User.deleteMany();
    await Tour.deleteMany();
    await Review.deleteMany();
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  delAllTours();
}
console.log(process.argv);
