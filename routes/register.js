/**
 * @file The register file contains the routes that deal with registerting
 * Organizations and Employees. These routes are not authenticated and
 * therefore do not require a JWT to access them.
 * @author Sam Galizia
 *
 * @module Routes/Register
 * @requires {@link https://www.npmjs.com/package/express Express}
 * @requires Utils/ClientResponse
 * @requires Utils/Logger
 * @requires Models/Organization
 */

const { Router } = require('express');
const { respondWith } = require('../utils/clientResponse');
const logger = require('../utils/logger');
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
  org.save()
    .then((saved) => {
      respondWith(res, 201, ['Organization created.'], { org_id: saved.id });
    })
    .catch((err) => {
      /** Log out errors if something went wrong */
      logger.error(err);

      /** Collect errors in an array */
      const keys = Object.keys(err.errors);
      const errorMessages = keys.map(key => err.errors[key].message);
      return respondWith(res, 400, errorMessages);
    });
});

module.exports = router;
