const fs = require('fs');
const express = require('express');
const tourRouter = require('./route/tourRoutes');
const userRouter = require('./route/userRoutes');

///////////////// MIDDLEWARES ///////////////////

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
// );

// app.get('/', (req, res) => {
//   res.status(200).json({ message: 'Hello from server side', app: 'Natour' });
// });

///////////////// ROUTER HANDLERS ///////////////////

// app.get('/api/v1/tours', getAllTours);

// app.post('/api/v1/tours', createTour);

// app.get('/api/v1/tours/:id', getTour);

// app.patch('/api/v1/tours/:id', updateTour);

// app.delete('api/v1/tours/:id', deleteTour);

///////////////// ROUTERS ///////////////////

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

///////////////// STARTING SeRVER///////////////////

module.exports = app;
