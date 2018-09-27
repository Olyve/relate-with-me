const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

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
});

/* eslint-disable func-names, prefer-arrow-callback */
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
  return bcrypt.genSalt(
    10,
    (err, salt) => bcrypt.hash(user.password, salt, (_, hash) => {
      user.password = hash;
      return next();
    }),
  );
});

// Comapring the password as a method
OrganizationSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    done(err, isMatch);
  });
};

module.exports = mongoose.model('Organization', OrganizationSchema);
