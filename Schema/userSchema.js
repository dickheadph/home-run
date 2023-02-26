const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const SECRET_KEY = process.env.SECRET_KEY;
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 30,
      required: [true, 'A user must have a name.'],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    role: {
      type: String,
      default: 'user',
      enum: {
        values: ['admin', 'user'],
        message: 'No role has been specified.',
      },
    },
    active: {
      type: Boolean,
      default: true,
      select: true,
    },
    image: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1641391503184-a2131018701b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fGRlZmF1bHQlMjBpbWFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'Please provide a strong password.'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        //Validate if pass and confirmPass are thesame
        validator: async function (passConfirm) {
          return passConfirm === this.password;
        },
        message: 'Password are not thesame',
      },
      select: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

//Middlewares
userSchema.pre('save', async function (next) {
  //Check if password was tampered
  if (this.isModified(this.password)) {
    return next();
  }
  //Encrypt password & unset confirmPassword
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});
//Instance Methods
userSchema.methods.comparePassword = async function (
  stringPassword,
  hashedPassword
) {
  return await bcrypt.compare(stringPassword, hashedPassword);
};
userSchema.methods.generateJWToken = function (userId) {
  return jwt.sign({ userId }, process.env.SECRET_KEY, {
    expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
  });
};
// userSchema.methods.isTokenValid = function () {

// }
module.exports = mongoose.model('User', userSchema);
