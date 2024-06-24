const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
const port = process.env.PORT || 3000;

// console.log(process.env);
const DB =
  'mongodb+srv://josephikegwu:SXT2hDodGoY7hnV0@cluster0.jwuyhe7.mongodb.net/natures?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB).then(() => console.log('DB connections successful'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
