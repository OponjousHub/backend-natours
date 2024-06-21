const fs = require('fs');
const express = require('express');
const tourRouter = require('./route/tourRoutes');
const userRouter = require('./route/userRoutes');
const AppError = require('./utils/appError');
const globalerrorHandler = require('./controllers/errorController');

///////////////// MIDDLEWARES ///////////////////

const app = express();
app.use(express.json());

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

app.all('*', (req, res, next) => {
  // const err = new Error(`can't find the ${req.originalUrl} on the server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`can't find the ${req.originalUrl} on the server!`));
});

app.use(globalerrorHandler);

///////////////// STARTING SeRVER///////////////////

module.exports = app;
