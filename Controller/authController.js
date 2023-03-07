const AsyncHandler = require('express-async-handler');
const AppErr = require('../Middlewares/AppError');
const User = require('../Schema/userSchema');
const imageUpload = require('../Utility/imageUpload');
const jwt = require('jsonwebtoken');
const sharp = require('sharp');

exports.userSignup = AsyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  //console.log(req.file);
  //Check if email is already in use
  const account = await User.findOne({ email });
  if (account) {
    throw new Error('Email already in use. Please use another account.');
  }

  req.file.filename = `${name.split(' ')[0]}-${parseInt(
    Date.now() / 1000,
    10
  )}`;
  sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpg')
    .jpeg({ quality: 50 })
    .toFile(`${process.env.DIRECTORY_PATH}/${req.file.filename}.jpg`);

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
    throw new Error('Failed creating Account. Please try again.');
  }
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
  });
});

exports.protectRoute = AsyncHandler(async (req, res, next) => {
  const header = req.headers.authorization;
  let token;
  if (header && header.startsWith('Bearer')) {
    token = header.split(' ')[1];
  }
  if (!token) {
    return next(new AppErr('You are not allowed to access this path.', 403));
  }
  const credentials = jwt.verify(token, process.env.SECRET_KEY);

  const expiryTime = parseInt(credentials.exp, 10);
  const currentTime = parseInt(Date.now() / 1000, 10);
  //current time 9 and expiry time 10 -> valid
  const isTokenValid = expiryTime > currentTime;

  if (!isTokenValid) {
    return next(new AppErr('Token has expired or is invalid.', 403));
  }

  const currentUser = await User.findById(credentials.userId);

  req.user = currentUser;

  next();
});
