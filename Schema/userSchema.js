const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 25,
      required: [true, 'A user must have a name.'],
    },
    email: {
      type: String,
      maxlength: 25,
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
      select: false,
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
      required: [true, 'Please provide a strong password.'],
      validator: {
        validate: function (passConfirm) {
          return passConfirm === this.password;
        },
      },
      message: 'Password are not thesame.',
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

module.exports = mongoose.models['User'] || mongoose.model('User', userSchema);
