const fs = require('fs');
const mongoose = require('mongoose');
// const app = require('./app');
// const detenv = require('dotenv');
const Tour = require('./../../models/tourModel');
// const port = 3000;

// dotenv.config({ path: './config.env' });

const DB =
  'mongodb+srv://josephikegwu:SXT2hDodGoY7hnV0@cluster0.jwuyhe7.mongodb.net/natures?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB).then(() => console.log('DB connections successful'));

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

// IMPORT DATS INTO DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Tours added successfull.');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const delAllTours = async () => {
  try {
    await Tour.deleteMany();
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
