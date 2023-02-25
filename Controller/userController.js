const User = require('../Schema/userSchema');
const AsyncHandler = require('express-async-handler');
const AppErr = require('../Middlewares/AppError');

exports.getUsers = AsyncHandler(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    return next(new AppErr('No Users available', 403));
  }

  res.status(200).json({
    message: 'success',
    length: users.length,
    users,
  });
});

exports.getOneUser = AsyncHandler(async (req, res, next) => {
  //console.log(req.users.id);
  const user = await User.findOne(req.users);
  console.log(user);
  if (!user) {
    return next(new AppErr('No User found with that Id', 403));
  }

  res.status(200).json({
    message: 'success',
    user,
  });
});

exports.addNewUser = AsyncHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;
  const newUser = User.create({ name, email, password, confirmPassword });

  if (!newUser) {
    return next(new AppErr('Failed to Create User profile', 403));
  }
  res.status(201).json({
    message: 'success',
    newUser,
  });
});
