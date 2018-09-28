const { Router } = require('express');
const { clientResponse } = require('../utils/clientResponse');
const Organization = require('../models/organization');

const router = Router();

/**
 * A route to test for server availability.
 */
router.get('/', (_req, res) => {
  clientResponse(res, 200);
});

router.get('/docs', (req, res) => {
  res.sendFile('/index.html');
});

router.post('/register/organization', (req, res) => {
  const org = new Organization(req.body);

  return clientResponse(res, 201);
});

module.exports = router;
