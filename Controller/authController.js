const AsyncHandler = require('express-async-handler');
const AppErr = require('../Middlewares/AppError');
const User = require('../Schema/userSchema');
const imageUpload = require('../Utility/imageUpload');

exports.userSignup = AsyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  console.log(req.file);
  //Check if email is already in use
  const account = await User.findOne({ email });
  if (account) {
    throw new Error('Email already in use. Please use another account.');
  }

  const imageUrl = await imageUpload(req, 'Users_Homerun');

  //Create user profile
  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
    image: imageUrl,
  });

  if (!newUser) {
    return next(new Error('Failed creating Account. Please try again.'));
  }
  console.log(newUser);
  const token = newUser.generateJWToken(newUser.id);

  res.status(201).json({
    status: 'success',
    token,
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
  const check = await user.comparePassword(password, user.password);
  if (!check) {
    return next(new AppErr('Invalid user credentials. Please try again.', 401));
    //throw new Error('Invalid user credentials. Please try again.');
  }
  const token = user.generateJWToken(user.id);
  res.status(200).json({
    status: 'success',
    token,
    profile: user,
  });
});
