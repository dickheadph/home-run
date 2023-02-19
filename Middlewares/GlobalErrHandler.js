const AppErr = require('../Middlewares/AppError');

const handleCastError = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppErr(message, 404);
};

const handleDuplicates = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Invalid duplicate feilds of ${value}.`;
  return new AppErr(message, 400);
};

const validationHandler = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppErr(message, 400);
};

const handleJWTError = () => {
  return new AppErr('Invalid token. Please log in again.', 401);
};

const expiredJWT = () => {
  return new AppErr('Token has expired. Please log in again', 401);
};

const devErr = (err, req, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const prodErr = (err, req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err,
      stack: err.stack,
    });
  } else {
    res.status(500).json({
      status: 'FAILED',
      message: 'Something went wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  this.statusCode = err.statusCode || 500; //fail
  this.status = err.status || 'error';
  this.message = err.message;

  res.status(this.statusCode).json({
    status: this.status,
    message: this.message,
  });

  if (process.env.PROJECT_MODE === 'development') {
    devErr(err, res);
  } else if (process.env.PROJECT_MODE === 'production') {
    let error = { ...err };

    //HANDLE INVALID ID's
    if (error.name === 'CastError') {
      error = handleCastError(error);
    }

    //HANDLE DUPLICATE ID's
    if (error.code === 1100) {
      error = handleDuplicates(error);
    }

    //HANDLE INVALID ID's
    if (err.name === 'ValidationError') {
      err = validationHandler(error, res);
    }
    //HANDLE INVALID TOKEN
    if (err.name === 'ValidationError') {
      err = handleJWTError();
    }
    //HANDLE EXPIRED TOKEN
    if (err.name === 'TokenExpiredError') {
      err = expiredJWT();
    }
    prodErr(err, res);
  } else {
    return;
  }
};
