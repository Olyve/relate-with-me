/**
 * @file The Organization model.
 * @author Sam Galizia
 *
 * @module Models/Organization
 * @requires {@link https://www.npmjs.com/package/mongoose Mongoose}
 * @requires {@link https://www.npmjs.com/package/validator Validator}
 * @requires {@link https://www.npmjs.com/package/bcrypt bcrypt}
 * @returns {Mongoose.Model} Organization
 */

// FIXME: Be more descriptive in the fiel description

const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

/**
 * @constant {Mongoose.Schema} Schema
 */
const Schema = mongoose.Schema;/* eslint-disable-line prefer-destructuring */

/**
 * @constant {Schema} OrganizationSchema
 * The schema that defines the <tt>Organization</tt> model and its validations.
 */
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

/**
 * @description The <tt>preSave</tt> method is used to perform some operations
 * before the model saves to the database. Mainly it updates the timestamps and
 * makes sure to hash the password before saving.
 * @param {function} next Callback to indicate that function is finished
 */
function preSave(next) {
  const now = new Date();
  this.updatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  const org = this;
  if (!org.isModified('password')) {
    return next();
  }

  /** Salting/Hashing the password */
  return bcrypt.genSalt(
    10,
    (err, salt) => bcrypt.hash(org.password, salt, (_, hash) => {
      org.password = hash;
      return next();
    }),
  );
}

/** Setting the preSave method to run before the model saves */
OrganizationSchema.pre('save', preSave);

/* eslint-disable func-names */
OrganizationSchema.methods.comparePassword = function (password, done) {
  bcrypt.compare(password, this.password, (err, isMatch) => done(err, isMatch));
};

/**
 * @constant {Mongoose.Model} Organization
 * The model that was created using the <tt>mongoose.model()</tt> function
 * and the <tt>OrganizationSchema</tt>
 */
const Organization = mongoose.model('Organization', OrganizationSchema);

module.exports = Organization;
