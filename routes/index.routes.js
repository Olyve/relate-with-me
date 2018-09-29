/**
 * @file The index route file is the top of the heirarchy for all routes and
 * routers. All routes will be imported into this file and will be setup on the
 * main route. The earlier routes in the file will be unauthenticated routes, and
 * as you move further down the file the routes will become protected.
 * @author Sam Galizia
 *
 * @module Routes/Root
 * @requires {@link https://www.npmjs.com/package/express Express}
 * @requires Utils/ClientResponse
 * @requires Routes/Register
 * @returns {Express.Router}
 */

const { Router } = require('express');
const { respondWith } = require('../utils/clientResponse');
const registerRouter = require('./register');

const router = Router();

/**
 * @description A route to test for server availability.
 */
router.get('/', (_req, res) => {
  respondWith(res, 200);
});

/**
 * @description This route returns the index file for the documentation
 */
router.get('/docs', (req, res) => {
  res.sendFile('/index.html');
});

/** Configure routers */
router.use('/register', registerRouter);

module.exports = router;
