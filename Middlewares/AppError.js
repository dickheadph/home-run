class AppErr extends Error {
  constructor(message, statusCode) {
    super(message);
    // const err = new Error(`Cannot find the path for ${req.originalUrl}`);
    // err.status = 'FAILED';
    // err.statusCode = 404;
    // next(err);

    this.statusCode = statusCode;
    this.message = `${statusCode}`.startsWith('4') ? 'FAILED' : 'ERROR';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppErr;
