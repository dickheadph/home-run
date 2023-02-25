const express = require('express');
const GlobalErrHandler = require('./Middlewares/GlobalErrHandler');
const AppErr = require('./Middlewares/AppError');
const app = express();
app.use(express.json());

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
