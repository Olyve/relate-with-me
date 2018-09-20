const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

/* eslint-disable-next-line prefer-destructuring */
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
  createdAt: { type: Date },
  updatedAt: { type: Date },
  email: {
    type: String,
    required: true,
    validate: {
      validator: v => isEmail(v),
      message: 'Not a valid email address.',
    },
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password is too short.'],
    select: false,
  },
  name: {
    type: String,
    required: true,
  },
  street_1: {
    type: String,
    required: true,
  },
  street_2: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    maxlength: 2,
    required: true,
  },
  zip: {
    type: Number,
    minlength: 5,
    maxlength: 5,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
});

/* eslint-disable-next-line func-names */
OrganizationSchema.pre('save', function (next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  // Salting
  return bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(user.password, salt, (_, hash) => {
      user.password = hash;
      return next();
    });
  });
});

module.exports = mongoose.model('Organization', OrganizationSchema);
