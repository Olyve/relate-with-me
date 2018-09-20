const jwt = require('jsonwebtoken');

const clientResponse = require('../utils/clientResponse');
const logger = require('../utils/logger');

// Authentication Middleware
const verifyAuth = (req, res, next) => {
  // Early exit if no Authorization header
  if (req.get('Authorization') === undefined) {
    return clientResponse(res, 401);
  }

  // Get token from Authorization header
  // Header format - Authorization: Bearer [token]
  const authToken = req.get('Authorization').split(' ')[1];

  // Verify token is valid, then add to the payload and proceed
  return jwt.verify(authToken, process.env.SECRET, (err, token) => {
    if (err) {
      logger.error(`Verify Token Error: ${err}`);
      return clientResponse(res, 401);
    }

    req.user = token;
    return next();
  });
};

module.exports = {
  verifyAuth,
};
