const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION -- SHOTTING DOWN');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB =
  'mongodb+srv://josephikegwu:SXT2hDodGoY7hnV0@cluster0.jwuyhe7.mongodb.net/natures?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB).then(() => console.log('DB connections successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥 SHOTTING DOWN...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
