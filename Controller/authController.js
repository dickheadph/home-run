const AsyncHandler = require('express-async-handler');
const AppErr = require('../Middlewares/AppError');
const User = require('../Schema/userSchema');

exports.userSignup = AsyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  //Check if email is already in use
  const account = await User.findOne({ email });
  if (account) {
    throw new Error('Email already in use. Please use another account.');
  }
  //Create user profile
  const newUser = await User.create({ name, email, password, confirmPassword });

  if (!newUser) {
    return next(new Error('Failed creating Account. Please try again.'));
  }
  res.status(201).json({
    message: 'success',
    newUser,
  });
});

exports.userLogin = AsyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  //Check for credentials validity
  if (!email && !password) {
    return next(new Error('Please provide a valid email and password.'));
  }
  //Get user initial data
  const user = await User.findOne({ email }).select('+password');
  //Compare stringedPass to hashedPass
  //const check = await user.comparePassword(password, user.password);
  if (!(await user.comparePassword(password, user.password))) {
    //return next(new Error('Invalid user credentials. Pleaser try again.'));
    throw new Error('Invalid user credentials. Pleaser try again.');
  }
  res.status(200).json({
    message: 'logged in',
    profile: user,
  });
});
