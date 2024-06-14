const mongoose = require('mongoose');
const app = require('./app');
const port = 3000;

const DB =
  'mongodb+srv://josephikegwu:SXT2hDodGoY7hnV0@cluster0.jwuyhe7.mongodb.net/natures?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(DB).then(() => console.log('DB connections successful'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
