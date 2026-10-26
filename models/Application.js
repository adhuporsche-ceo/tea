
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true
    },
    internship: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Application ||
  mongoose.model('Application', applicationSchema);
