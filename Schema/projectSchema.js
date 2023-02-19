const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 20,
      required: [true, 'A project must have a name'],
      default: 'alpha',
    },
    type: {
      type: String,
      maxlength: 10,
      required: [true, 'A project must have a type'],
      default: 'construction',
    },
    category: {
      type: String,
      maxlength: 15,
      enum: {
        values: ['planning', 'architecture', 'construction'],
        message: 'No project category given.',
      },
      required: [true, 'A project must belong to a category.'],
      default: 'construction',
    },
    image: {
      type: String,
      required: [true, 'A project must have an image.'],
      default:
        'https://plus.unsplash.com/premium_photo-1661542769747-4c6aaf601135?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzE5fHxidWlsZGluZyUyMGNvbnN0cnVjdGlvbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
    },
    author: {
      type: String,
      default: 'Homerun Inc.',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
  {
    toObject: {
      virtuals: true,
    },
  }
);

//mongoose.models = {};

module.exports =
  mongoose.models['Projects'] || mongoose.model('Projects', projectSchema);
