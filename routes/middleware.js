/**
 * @file The middleware file contains all of the middleware functions used for
 * the server. Each function is exported and can be used individually where needed.
 * @author Sam Galizia
 *
 * @module Routes/Middleware
 * @requires {@link https://www.npmjs.com/package/jsonwebtoken JSON Web Token}
 * @requires Utils/ClientResponse
 * @requires Utils/Logger
 */

const jwt = require('jsonwebtoken');
const { respondWith } = require('../utils/clientResponse');
const logger = require('../utils/logger');

/**
 * @description The verifyAuth function is used to decrypt the JWT sent with requests
 * and add the user info to the request.
 * @param {Express.Request} req The request from the client
 * @param {Express.Response} res The response object that will be sent to the
 * client
 * @param {function} next The callback function to move on to the next piece of
 * middleware in the route.
 */
const verifyAuth = (req, res, next) => {
  /** If no Authorization header is present, return Unauthorized */
  if (req.get('Authorization') === undefined) {
    return respondWith(res, 401);
  }

  /**
   * Get token from Authorization header.
   * Header Format - Authorizarion: Bearer [token]
   */
  const authToken = req.get('Authorization').split(' ')[1];

  /** Verify token is valid, then add it to the payload and proceed */
  return jwt.verify(authToken, process.env.SECRET, (err, token) => {
    if (err) {
      logger.error(`Verify Token Error: ${err}`);
      return respondWith(res, 401);
    }

    req.user = token;
    return next();
  });
};

module.exports = {
  verifyAuth,
};
