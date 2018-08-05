/* eslint-disable */

// Transpile all code following this line with babel and use 'env' preset
require('babel-register')({
  presets: ['env'],
});

// Import the rest of the application
module.exports = require('./index');
