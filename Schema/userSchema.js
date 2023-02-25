const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { use } = require('../Routes/userRoute');
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 25,
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
    photo: {
      type: String,
      default:
        'https://images.unsplash.com/photo-1641391503184-a2131018701b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NjR8fGRlZmF1bHQlMjBpbWFnZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'Please provide a strong password.'],
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

module.exports = mongoose.model('User', userSchema);
