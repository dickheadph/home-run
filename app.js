const express = require('express');
const cors = require('cors');
const GlobalErrHandler = require('./Middlewares/GlobalErrHandler');
const AppErr = require('./Middlewares/AppError');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ['http://localhost:3000', 'https://homerun-eight.vercel.app/'],
  })
);
const projectRoute = require('./Routes/projectRoute');
const usersRoute = require('./Routes/userRoute');

app.use('/homerun/projects', projectRoute);
app.use('/homerun/users', usersRoute);

app.all('*', (req, res, next) => {
  return next(
    new AppErr(
      `Cannot find ${req.originalUrl} endpoit. Refer to API Documentation.`
    )
  );
});

app.use(GlobalErrHandler);

module.exports = app;
