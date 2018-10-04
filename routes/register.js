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
router.post('/organization', async (req, res) => {
  /** Check if a org exists with provided email */
  let foundOrg;
  try {
    foundOrg = await Organization.findOne({ email: req.body.email });
  } catch (err) {
    logger.error(`Find Orgnaization Error: ${err}`);
    return respondWith(res, 400);
  }

  /** early exit with 400 if already exists */
  if (foundOrg) {
    return respondWith(res, 400, ['An organization with that email already exists.']);
  }

  try {
    const org = await new Organization(req.body).save();
    return respondWith(res, 201, ['Organization created.'], { org_id: org.id });
  } catch (error) {
    /** Collect errors in an array */
    const errorMessages = [];
    Object.keys(error.errors).forEach(key => errorMessages.push(error.errors[key].message));
    return respondWith(res, 400, errorMessages);
  }
});

module.exports = router;
