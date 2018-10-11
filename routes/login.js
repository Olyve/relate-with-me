/**
 * @file The login routes file contains the routes for loging in either as an
 * organization or as an employee.
 * @author Sam Galizia
 *
 * @module Routes/Login
 */

const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { respondWith } = require('../utils/clientResponse');
const Organization = require('../models/organization');

const router = Router();

/** Login an organization */
router.post('/organization', async (req, res) => {
  const org = await Organization.findOne({ email: req.body.email }).exec();
  const token = await jwt.sign({ org_id: org.id }, process.env.SECRET);
  return respondWith(res, 200, ['Organization logged in.'], { token });
});

module.exports = router;
