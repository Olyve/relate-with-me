const { Router } = require('express');
const { clientResponse } = require('../utils/clientResponse');

const router = Router();

// Landing page
router.get('/', (_req, res) => {
  clientResponse(res, 200);
});

module.exports = router;
