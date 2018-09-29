/**
 * @file The register file contains the routes that deal with registerting
 * Organizations and Employees. These routes are not authenticated and
 * therefore do not require a JWT to access them.
 * @author Sam Galizia
 *
 * @module Routes/Register
 * @requires {@link https://www.npmjs.com/package/express Express}
 * @requires {@link module:ClientResponse ClientResponse}
 * @requires {@link module:Models/Organization Organization}
 */

const { Router } = require('express');
const { respondWith } = require('../utils/clientResponse');
const Organization = require('../models/organization');

/**
 * @constant {Express.Router} router
 * The instance of <tt>Express.Router</tt> to add new routes on to. This is
 * eventually exported from the module.
 */
const router = Router();

/**
 * @description This route is used to create a new Organization
 * @returns {Express.Response}
 */
router.post('/organization', (req, res) => {
  const org = new Organization(req.body);

  return respondWith(res, 201);
});

module.exports = router;
